import React, { useState } from "react";
import styled from "styled-components";
import { Card, Form, Button } from "react-bootstrap";

const Task = ({
  user,
  history,
  id,
  title,
  request_type,
  description,
  completed,
  created_date,
  handlePopupClose,
  volunteer_id,
  task_fulfilled,
}) => {
  const [disable, setDisable] = useState(false);

  const handleRepost = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/messages", {
        creator_id: user.id,
        request_id: id,
        body: userMessage,
      });
    } catch (error) {
      console.log("report error", error);
    }
  };
  const handleCompleted = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/messages", {
        creator_id: user.id,
        request_id: id,
        body: userMessage,
      });
      setDisable(true);
    } catch (error) {
      console.log("task completed error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete("http://localhost:3000/messages", {
        creator_id: user.id,
        request_id: id,
        body: userMessage,
      });
    } catch (error) {
      console.log("delete error", error);
    }
  };

  const handleFulfilled = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/messages", {
        creator_id: user.id,
        request_id: id,
        body: userMessage,
      });
      setDisable(true);
    } catch (error) {
      console.log("fulfillment error", error);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleVolunteer = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/messages", {
        creator_id: user.id,
        request_id: id,
        body: userMessage,
      });
      history.push("/pages/chat");
    } catch (error) {
      console.log("volunteer error", error);
    }
  };

  const renderButtons = () => {
    console.log("history data", history);
    if (history.pathname === "/pages/my-request") {
      return (
        <div className='d-flex justify-content-around'>
          <Button
            variant='secondary'
            onClick={handleRepost}
            disabled={completed}
          >
            Repost
          </Button>
          <Button
            variant='primary'
            onClick={handleCompleted}
            disabled={completed}
          >
            Completed
          </Button>
        </div>
      );
    } else if (history.pathname === "/pages/my-volunteer-work") {
      return (
        <div className='d-flex justify-content-around'>
          <Button
            variant='secondary'
            onClick={handleDelete}
            disabled={task_fulfilled}
          >
            Delete
          </Button>
          <Button
            variant='primary'
            onClick={handleFulfilled}
            disabled={task_fulfilled}
          >
            Fulfilled
          </Button>
        </div>
      );
    } else {
      return (
        <div className='d-flex justify-content-around'>
          <Button variant='secondary' onClick={handlePopupClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleVolunteer}>
            Volunteer
          </Button>
        </div>
      );
    }
  };

  return (
    <Card style={{ width: "15rem" }}>
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
          <Button variant='primary'>Volunteer</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;
