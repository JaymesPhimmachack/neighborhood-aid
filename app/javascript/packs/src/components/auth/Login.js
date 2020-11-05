import React, { useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const StyledLogin = styled.div`
  z-index: 10;
`;

const Login = ({ handleSuccessfulAuth }) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
    }
  );

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = userInput;

      const { data } = await axios.post(
        "http://localhost:3000/sessions",
        {
          user: {
            email,
            password,
          },
        },
        { withCredentials: true }
      );

      setUserInput({
        email: "",
        password: "",
      });

      if (data.logged_in) {
        handleSuccessfulAuth(data);
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <StyledLogin>
      <h1 className='mb-5 mt-3 text-center'>LogIn</h1>
      <Form onSubmit={handleSubmit}>
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

        <Button variant='primary' type='submit' className='w-100'>
          Login
        </Button>
      </Form>
    </StyledLogin>
  );
};

export default Login;
