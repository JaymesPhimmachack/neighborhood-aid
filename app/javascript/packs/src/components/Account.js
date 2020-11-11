import React, { useEffect, useReducer } from "react";
import Avatar from "./Avatar";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const StyledAccount = styled.div`
  max-width: 500px;
  margin: 0 auto;
  .btn-style {
    width: 100px;
  }
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

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
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
        `https://jp-neighborhood-aid.herokuapp.com/registrations/${user.id}`,

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
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://jp-neighborhood-aid.herokuapp.com/registrations/${user.id}`
      );
      if (data.status === "no_content") {
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
      <div className='text-center w-25 mx-auto'>
        <Avatar photoUrl={user.photo_url} />
      </div>
      <Form onSubmit={handleSubmit} className='mt-4'>
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
        <div className='d-flex justify-content-around mt-4'>
          <Button variant='primary' type='submit' className='btn-style'>
            Update
          </Button>
          <Button variant='danger' onClick={handleDelete} className='btn-style'>
            Delete
          </Button>
        </div>
      </Form>
    </StyledAccount>
  );
};

export default Account;
