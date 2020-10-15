import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoutClick = async () => {
    try {
      const { data } = await axios.delete("http://localhost:3000/logout", {
        withCredentials: true,
      });

      if (data.logged_out) {
        this.props.handleLogout();
      }
    } catch (error) {
      console.log("logout error", error);
    }
  };

  render() {
    return (
      <header>
        <nav>
          <Link className='nav-link active' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='pages/login'>
            Sign In
          </Link>
          <Link className='nav-link' to='pages/register'>
            Register
          </Link>
          <Link className='nav-link' to='pages/requests'>
            Requests
          </Link>
          <Link className='nav-link' to='pages/create-request'>
            Create Request
          </Link>
          <Link className='nav-link' to='pages/my-request'>
            My Request
          </Link>
          <Link className='nav-link' to='pages/chat'>
            Chat
          </Link>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </nav>
      </header>
    );
  }
}

export default Header;
