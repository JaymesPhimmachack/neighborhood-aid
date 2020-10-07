import React, { Component } from 'react'
import styled from "styled-components";

const Styles = styled.div`
  .btn-style {
    width: 150px;
		height: 40px;
  }
	.form-style {
		margin-bottom: 50px;
	}
`;

class CreateRequest extends Component {
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

  handleChange = () => {

  }
  render() {
  return (
	<Styles>
		<h1>Create Request Page</h1>
    <form action="">
      <div className="form-group">
          <label htmlFor="first_name"></label>
          <select name="" id="">
            <option value="one-time task">One-time task</option>
            <option value="material needs">Material needs</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="password">Title</label>
        <input onChange={this.handleChange} type="text" name="password" value={this.state.password} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Description</label>
        <input onChange={this.handleChange} type="text" name="password" value={this.state.password} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Address</label>
        <input onChange={this.handleChange} type="text" name="password" value={this.state.password} />
      </div>
        <button type="submit">Submit</button>
    </form>
	</Styles>
  )
  }
}

export default CreateRequest