import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaHandsHelping } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";

const StyledNavbar = styled(Navbar)`
  background-color: transparent;
  .btn-style {
    border: none;
    padding: 0.5rem 1rem;
  }
  .btn-logout {
    width: 100%;
  }
  .brand {
    margin: 10px;
  }
`;

const Header = ({ handleLogout, handleShow, name }) => {
  let history = useHistory();
  const handleLogoutClick = async () => {
    try {
      const { data } = await axios.delete("http://localhost:3000/logout", {
        withCredentials: true,
      });

      if (data.logged_out) {
        handleLogout();
        history.push("/");
      }
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <StyledNavbar expand='lg'>
      <Link className='navbar-brand' to='/'>
        <FaHandsHelping className='brand' />
        Neighborhood Aid
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Link className='nav-link active' to='/'>
            Home
          </Link>
          <button className='btn-style' name='signin' onClick={handleShow}>
            Sign In
          </button>
          <button className='btn-style' name='register' onClick={handleShow}>
            Register
          </button>
          <Link className='nav-link' to='/pages/requests'>
            Requests
          </Link>
          <Link className='nav-link' to='/pages/my-request'>
            My Request
          </Link>
          <Link className='nav-link' to='/pages/chat'>
            Chat
          </Link>
          <NavDropdown
            title={`Hi ${name}!`}
            id='basic-nav-dropdown'
            className='dropleft'
          >
            <Link className='nav-link text-center' to='/pages/account'>
              Account
            </Link>
            <NavDropdown.Divider />
            <button
              className='btn-style btn-logout'
              onClick={() => handleLogoutClick()}
            >
              Logout
            </button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

export default Header;
