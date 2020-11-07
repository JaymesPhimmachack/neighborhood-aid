import React, { useState, useEffect, useReducer } from "react";
import Avatar from "./Avatar";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const StyledAccount = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Account = ({
  history,
  user,
  updateUser,
  deleteUser,
  setLoggedInStatus,
  setUser,
  deleteUserData,
  loggedInStatus,
}) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      photo: "",
    }
  );

  useEffect(() => {
    if (loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/");
    }
    setUserInput({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }, [loggedInStatus]);

  const [updateMessage, setupdateMessage] = useState("");

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };

  const onDrop = (picture) => {
    setPhoto(picture);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    } = userInput;
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/registrations/${user.id}`,
        {
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
        },

        { withCredentials: true }
      );

      if (data) {
        updateUser(data);

        setUserInput({
          password: "",
          password_confirmation: "",
        });
        setupdateMessage(data.message);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/registrations/${user.id}`
      );
      if (data.status === "no_content") {
        console.log("handleDelete", user);
        deleteUserData(user.id);
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser({});
        deleteUser();
        history.push("/");
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };

  return (
    <StyledAccount className='mt-5'>
      <div className='text-center'>
        <Avatar photoUrl={user.photo_url} />
      </div>
      <Form onSubmit={handleSubmit} className='mt-4'>
        {updateMessage ? (
          <div
            class='alert alert-success alert-dismissible fade show'
            role='alert'
          >
            {updateMessage}
            <button
              type='button'
              class='close'
              data-dismiss='alert'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        ) : null}
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            name='first_name'
            value={userInput.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            value={userInput.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Group>
          <Form.Control
            type='email'
            name='email'
            value={userInput.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Group>
          <Form.Control
            type='password'
            name='password'
            value={userInput.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Group>
          <Form.Control
            type='password'
            name='password_confirmation'
            value={userInput.password_confirmation}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className='d-flex justify-content-around'>
          <Button variant='primary' type='submit'>
            Update
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </Form>
    </StyledAccount>
  );
};

export default Account;
