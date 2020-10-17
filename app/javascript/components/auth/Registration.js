import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      } = this.state;

      const response = await axios.post(
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
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      console.log(response);
      if (response.data.status === "created") {
        this.props.handleSuccessfulAuth(response.data);
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className='m-5'>Registration Pages</h1>
        <Form>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type='text'
              name='last_name'
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </Form.Group>
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
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              name='password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id='exampleFormControlFile1'
              label='Example file input'
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100'>
            Signup
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SignUp;
