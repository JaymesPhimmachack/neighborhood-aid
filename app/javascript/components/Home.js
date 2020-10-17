import React, { useState, useEffect } from "react";
import { Modal, Container, Button } from "react-bootstrap";
import mainImage from "../../assets/images/humanitarian-aid-939723.jpg";
import styled from "styled-components";

const StyledHome = styled.div`
  background-image: url(${mainImage});
  object-fit: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  padding: 10px;
`;

const Home = ({ history, handleLogin, loggedInStatus, handleShow }) => {
  const handleClose = () => {
    setShow(false);
    setShowLogin(false);
  };
  const handleShow = () => {
    setShow(true);
    setShowLogin(true);
  };

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
          <h2>{loggedInStatus}</h2>
          <h3>Lend a helping hand or ask for help.</h3>
          <div>
            <p>Ready to make a difference or look for help?</p>
            <Button variant='secondary' onClick={handleShow}>
              Sign Up
            </Button>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Body>
            {showLogin ? (
              <Login handleSuccessfulAuth={handleLogin} />
            ) : (
              <Registration handleSuccessfulAuth={handleLogin} />
            )}
          </Modal.Body>
          <Modal.Footer>
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
