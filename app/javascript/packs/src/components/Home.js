import React, { useState, useEffect } from "react";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import { Modal, Container, Button } from "react-bootstrap";
import mainImage from "../../../../assets/images/humanitarian-aid-939723.jpg";
import styled from "styled-components";

const StyledHome = styled.div`
  background-image: url(${mainImage});
  object-fit: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  .wrapper {
    width: 700px;
    margin: 70px auto;
  }
  h1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 64px;
  }
  .btn-style {
    width: 150px;
    height: 50px;
  }
  .cta {
    margin-top: 170px;
  }
`;

const Home = ({
  history,
  handleLogin,
  loggedInStatus,
  handleClose,
  handleShow,
  show,
  showBtnClick,
}) => {
  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    history.push("/requests");
  };

  useEffect(() => {
    console.log(history);
  }, []);

  return (
    <StyledHome>
      <Container>
        <div className='wrapper'>
          <h1>Neighborhood Aid</h1>
          <h3>Lend a helping hand or ask for help.</h3>
          <div className='cta'>
            <p>Ready to make a difference or look for help?</p>
            <Button
              variant='secondary'
              name='register'
              className='btn-style'
              onClick={handleShow}
            >
              Sign Up
            </Button>
            <h4>{loggedInStatus}</h4>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Body>
            {showBtnClick === "signin" ? (
              <Login handleSuccessfulAuth={handleSuccessfulAuth} />
            ) : (
              <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
            )}
          </Modal.Body>
          <Modal.Footer className='mt-3'>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StyledHome>
  );
};

export default Home;
