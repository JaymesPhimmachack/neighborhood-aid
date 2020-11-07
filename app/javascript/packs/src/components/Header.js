import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaHandsHelping } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";

const StyledNavbar = styled(Navbar)`
  background-color: #264653;
  .btn-nav-style {
    border: none;
    background-color: #264653;
  }
  .btn-logout {
    width: 100%;
    background-color: #264653;
    border: none;
  }
  .brand {
    margin: 10px;
  }
  .dropdown-menu {
    background-color: #264653;
  }
  #basic-nav-dropdown {
    color: #fff;
  }
`;

const Header = ({ handleLogout, handleShow, name, loggedInStatus }) => {
  let history = useHistory();
  const handleLogoutClick = async () => {
    try {
      const { data } = await axios.delete(
        "https://jp-neighborhood-aid.herokuapp.com/logout",

        {
          withCredentials: true,
        }
      );

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
      <Link className='navbar-brand text-white' to='/'>
        <FaHandsHelping className='brand text-white' />
        Neighborhood Aid
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto navbar-dark'>
          {loggedInStatus === "NOT_LOGGED_IN" ? (
            <React.Fragment>
              <button
                className='btn-nav-style text-white'
                name='signin'
                onClick={handleShow}
              >
                Sign In
              </button>
              <button
                className='btn-nav-style text-white'
                name='register'
                onClick={handleShow}
              >
                Register
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className='nav-link active text-white' to='/'>
                Home
              </Link>
              <Link className='nav-link text-white' to='/pages/requests'>
                Requests
              </Link>
              <Link className='nav-link text-white' to='/pages/my-request'>
                My Request
              </Link>
              <Link
                className='nav-link text-white'
                to='/pages/my-volunteer-work'
              >
                My Volunteer Work
              </Link>
              <Link className='nav-link text-white' to='/pages/chat'>
                Chat
              </Link>
              <NavDropdown
                title={`Hi ${name}!`}
                id='basic-nav-dropdown'
                className='dropleft text-white'
              >
                <Link
                  className='nav-link text-center text-white'
                  to='/pages/account'
                >
                  Account
                </Link>
                <NavDropdown.Divider />
                <button
                  className='btn-logout text-white'
                  onClick={() => handleLogoutClick()}
                >
                  Logout
                </button>
              </NavDropdown>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

export default Header;
