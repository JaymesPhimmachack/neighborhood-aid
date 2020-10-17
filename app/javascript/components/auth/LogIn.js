import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = this.state;

      const response = await axios.post(
        "http://localhost:3000/sessions",
        {
          user: {
            email,
            password,
          },
        },
        { withCredentials: true }
      );

      this.setState({ email: "", password: "" });

      if (response.data.logged_in) {
        this.props.handleSuccessfulAuth(response.data);
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <h1 className='m-5'>LogIn Pages</h1>
        <Form>
          <Form.Label>Email</Form.Label>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='w-100'>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default LogIn;
