import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Header extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
	<header>
    <nav>
      <Link className="nav-link active" to="/">Home</Link>
      <Link className="nav-link" to="/login">Sign In</Link>
			<Link className="nav-link" to="/register">Register</Link>
      <Link className="nav-link" to="/requests">Requests</Link>
      <Link className="nav-link" to="/create-request">Create Request</Link>
			<Link className="nav-link" to="/my-request">My Request</Link>
      <Link className="nav-link" to="/chat">Chat</Link>
    </nav>
	</header>
    )
  }
}

export default Header
