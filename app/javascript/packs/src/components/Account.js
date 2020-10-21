import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Form, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

const StyledAccount = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Account = () => {
  const [userInput, setUserInput] = useState("");
  const [pictures, setPictures] = useState("");

  const handleUserInputChange = (event) => {
    const newValue = event.target.value;
    setUserInput(newValue);
  };

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        {
          user: {
            email,
            password,
            password_confirmation,
          },
        },
        { withCredentials: true }
      );

      // if(response.data.status === 'created') {
      //   this.props.handleSuccessfulAuth(response.data)
      // }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  return (
    <StyledAccount>
      <Avatar />
      <ImageUploader
        withIcon={false}
        buttonText='Edit Image'
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            value={userInput}
            onChange={handleUserInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            value={userInput}
            onChange={handleUserInputChange}
          />
        </Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            type='email'
            name='email'
            value={userInput}
            onChange={handleUserInputChange}
          />
        </Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Group controlId='formBasicPassword'>
          <Form.Control
            type='password'
            name='password'
            value={userInput}
            onChange={handleUserInputChange}
          />
        </Form.Group>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Group controlId='formBasicPassword'>
          <Form.Control
            type='password'
            name='password_confirmation'
            value={userInput}
            onChange={handleUserInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.File />
        </Form.Group>
        <div className='d-flex justify-content-around'>
          <Button variant='primary' type='submit'>
            Update
          </Button>
          <Button variant='danger'>Delete Account</Button>
        </div>
      </Form>
    </StyledAccount>
  );
};

export default Account;
