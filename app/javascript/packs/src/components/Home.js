import React, { useEffect } from "react";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { Modal, Container, Button } from "react-bootstrap";
import mainImage from "../../../../assets/images/team-4529717_1920.jpg";
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
    font-size: 54px;
    color: #f4f1de;
    text-shadow: 5px 5px 8px #737373;
  }
  .btn-style {
    width: 150px;
    height: 50px;
    background-color: #2a9d8f;
  }
  .cta {
    margin-top: 170px;
  }
  h3,
  p {
    color: #f4f1de;
    text-shadow: 5px 5px 8px #737373;
  }
`;

const Home = ({
  loggedInStatus,
  history,
  handleLogin,
  handleClose,
  handleShow,
  show,
  showBtnClick,
}) => {
  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    history.push("/pages/requests");
  };

  useEffect(() => {
    handleClose()

  })

  return (
    <StyledHome>
      <Container>
        <div className='wrapper'>
          <h1>Neighborhood Aid</h1>
          <h3>Lend a helping hand or ask for help.</h3>
          {
            loggedInStatus === "NOT_LOGGED_IN" ?
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
          </div> : null
}
        </div>
      </Container>
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
            <SignUp handleSuccessfulAuth={handleSuccessfulAuth} />
          )}
        </Modal.Body>
        <Modal.Footer className='mt-3'>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledHome>
  );
};

export default Home;
