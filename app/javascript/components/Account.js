import React, { components } from "react";
import Avatar from "./Avatar";
import styled from 'styled-components'
import { Component } from "react";

class Account extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

 handleSubmit = async (event) => {
   event.preventDefault()

   try {
    const { email, password, password_confirmation } = this.state

   const response = await axios.post('http://localhost:3000/signup',
      {
        user: {
          email,
          password,
          password_confirmation
        }
      },
      { withCredentials: true }
    )

    // if(response.data.status === 'created') {
    //   this.props.handleSuccessfulAuth(response.data)
    // }

   } catch(error) {
      console.log("registration error", error)
   }

  }

  handleChange = (e) => {
    const [name, value] = e.target;
    console.log(name, value)
  }
  render() {
    console.log(window.location.pathname)
   return (
  <React.Fragment>
    <div className="mx-auto w-25 my-3">
      <Avatar />
      <div className="d-flex justify-content-center">
      <div className="btn btn-mdb-color btn-rounded float-left">
        <span>Add photo</span>
        <input type="file" />
      </div>
    </div>
    </div>
    <form className="form" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="first_name"></label>
        <input onChange={(e) => this.handleChange(e)} type="text" name="first_name" value={this.state.first_name} />
      </div>
      <div className="form-group">
        <label htmlFor="last_name"></label>
        <input onChange={(e) => this.handleChange(e)} type="text" name="last_name" value={this.state.last_name} />
      </div>
      <div className="form-group">
        <label htmlFor="email"></label>
        <input onChange={(e) => this.handleChange(e)} type="text" name="email" value={this.state.email} />
      </div>
      <div className="form-group">
        <label htmlFor="password"></label>
        <input onChange={(e) => this.handleChange(e)} type="text" name="password" value={this.state.password} />
      </div>
      <div className="form-group">
        <label htmlFor="password_confirmation"></label>
        <input onChange={(e) => this.handleChange(e)} type="text" name="password_confirmation" value={this.state.password_confirmation} />
      </div>
      <div>
        <button type="submit">Update</button>
        <button type="button">Delete</button>
      </div>
      
    </form>

  </React.Fragment>
   )
  }
};

export default Account;
