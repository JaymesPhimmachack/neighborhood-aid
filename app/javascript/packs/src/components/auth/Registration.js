import React, { useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

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

      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      formData.append("photo", photo, photo.name);

      const { data } = await axios.post(
        "https://jp-neighborhood-aid.herokuapp.com/registrations",

        formData,
        { withCredentials: true }
      );

      setUserInput({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setPhoto("");

      if (data) {
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

  const fileSelectedHandler = (event) => {
    setPhoto(event.target.files[0]);
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
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            value={userInput.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Group>
          <Form.Control
            type='email'
            name='email'
            value={userInput.email}
            onChange={handleChange}
            required
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
        <Form.Group>
          <Form.File
            label='Upload Avatar (approved formats: .jpg, .png, .pdf)'
            type='file'
            name='photo'
            onChange={fileSelectedHandler}
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
