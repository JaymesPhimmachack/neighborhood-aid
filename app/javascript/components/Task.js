import React, { useState } from "react";
import styled from "styled-components";
import { Card, Form, Button } from "react-bootstrap";

const Task = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>One-time task 2/15/20</Card.Header>
      <Card.Body>
        <Card.Title className='mb-3'>Lawn mower broken</Card.Title>
        <Card.Subtitle className='mb-2 text-muted mb-3'>
          Status: unfulfilled
        </Card.Subtitle>
        <Card.Text className='mb-4'>
          I need help repairing my lawn mower.
        </Card.Text>
        <div className='d-flex justify-content-around'>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={handleShow}>
            Volunteer
          </Button>
        </div>
      </Card.Body>
      {show ? (
        <Card.Footer className='text-muted'>
          <Form>
            <Form.Group>
              <Form.Control as='textarea' rows='3' />
              <div className='d-flex justify-content-around'>
                <Button variant='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='primary'>Send</Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Footer>
      ) : null}
    </Card>
  );
};

export default Task;
