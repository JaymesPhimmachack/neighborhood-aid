import React, { useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import axios from "axios";
import styled from "styled-components";

const StyledSignup = styled.div`
  z-index: 10;
`;

const SignUp = ({ handleSuccessfulAuth }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  );

  const [photo, setPhoto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      } = userInput;

      const { data } = await axios.post(
        "http://localhost:3000/registrations",
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
      setUserInput({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

      console.log(data);
      if (data.status === "created") {
        handleSuccessfulAuth(data);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };

  const onDrop = (picture) => {
    setPhoto(picture);
  };

  return (
    <React.Fragment>
      <h1 className='m-5'>Register</h1>
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
        <Button variant='primary' type='submit' className='w-100'>
          Signup
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default SignUp;
