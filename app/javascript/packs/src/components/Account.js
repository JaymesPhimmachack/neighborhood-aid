import React, { useState, useEffect, useReducer } from "react";
import Avatar from "./Avatar";
import ImageUploader from "react-images-upload";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const StyledAccount = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Account = ({ history, user }) => {
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
    setUserInput({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }, []);

  const [photo, setPhoto] = useState("");

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
      const response = await axios.patch(
        `http://localhost:3000/registrations/${userInput.id}`,
        {
          user: {
            first_name,
            last_name,
            email,
            password,
            password_confirmation,
          },
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.status === 200) {
        // this.props.handleSuccessfulAuth(response.data);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/registrations/${userInput.id}`
      );
      if (response.data.status === "no_content") {
        history.push("/");
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };

  return (
    <StyledAccount>
      <Avatar />

      <Form onSubmit={handleSubmit}>
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
          />
        </Form.Group>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Group>
          <Form.Control
            type='password'
            name='password_confirmation'
            value={userInput.password_confirmation}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <ImageUploader
            withIcon={false}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
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
