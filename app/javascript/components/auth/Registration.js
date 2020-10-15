import React, { Component } from "react";
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
        <h1>Registration Pages</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='first_name'>First Name</label>
            <input
              onChange={this.handleChange}
              type='text'
              name='first_name'
              value={this.state.first_name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              onChange={this.handleChange}
              type='text'
              name='last_name'
              value={this.state.last_name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              onChange={this.handleChange}
              type='email'
              name='email'
              value={this.state.email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              onChange={this.handleChange}
              type='password'
              name='password'
              value={this.state.password}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password_confirmation'>Password Confirmation</label>
            <input
              onChange={this.handleChange}
              type='password'
              name='password_confirmation'
              value={this.state.password_confirmation}
            />
          </div>
          <div className='custom-file'>
            <input
              type='file'
              name='file'
              value={this.state.file}
              onChange={this.handleChange}
            />
            <label className='custom-file-label' htmlFor='file'>
              Copy of a government-approved ID (approved formats: .jpg, .png,
              .pdf)
            </label>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
