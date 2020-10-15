import React, { Component } from "react";
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
        <h1>LogIn Pages</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input
              onChange={this.handleChange}
              type='text'
              name='email'
              value={this.state.email}
              placeholder='Email'
            />
          </div>
          <div className='form-group'>
            <input
              onChange={this.handleChange}
              type='password'
              name='password'
              value={this.state.password}
              placeholder='Password'
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
