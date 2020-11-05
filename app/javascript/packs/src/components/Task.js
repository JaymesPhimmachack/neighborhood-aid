import React, { useState } from "react";
import styled from "styled-components";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const Task = ({
  user,
  history,
  requestId,
  title,
  request_type,
  description,
  completed,
  created_date,
  handlePopupClose,
  task_fulfilled,
  updateFulfillmentData,
  handleVolunteerClick,
  fulfillmentId,
  disable_republish,
}) => {
  const [disable, setDisable] = useState(false);

  const handleRepublish = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/requests/${requestId}`
      );
      console.log(data);
    } catch (error) {
      console.log("report error", error);
    }
  };

  const handleRequestDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/requests/${requestId}`
      );

      if (data.status === "no_content") {
        console.log(data);
      }
    } catch (error) {
      console.log("task completed error", error);
    }
  };

  const handleFulfillmentDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/fulfillments/${fulfillmentId}`
      );

      // update state after delete
      // if (data.status === "no_content") {
      //   handleFulfillmentDelete(fulfillmentId);
      // }
    } catch (error) {
      console.log("delete error", error);
    }
  };

  const handleFulfilled = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/fulfillments/${fulfillmentId}`,
        {
          request_id: requestId,
          volunteer_id: user.id,
          task_fulfilled: true,
        }
      );
      console.log(data);
      // get data back and update state and disable delete button
      // if (data.status === 202) {
      //   setDisable(true);
      //   updateFulfillmentData(data);
      // }
    } catch (error) {
      console.log("fulfillment error", error);
    }
  };

  const handleVolunteer = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/fulfillments", {
        request_id: requestId,
        volunteer_id: user.id,
      });
      console.log(data);
      // if (data.status === 201) {
      // updateFulfillmentData(data);
      // handleVolunteerClick();
      // }
    } catch (error) {
      console.log("volunteer error", error);
    }
  };

  const renderButtons = () => {
    console.log("history data", history);
    if (history.location.pathname === "/pages/my-request") {
      return (
        <div className='d-flex justify-content-around'>
          <Button
            variant='danger'
            onClick={handleRequestDelete}
            disabled={task_fulfilled}
            disabled={completed}
          >
            Delete
          </Button>
          <Button
            variant='secondary'
            onClick={handleRepublish}
            disabled={completed || disable_republish}
          >
            Republish
          </Button>
        </div>
      );
    } else if (history.location.pathname === "/pages/my-volunteer-work") {
      return (
        <div className='d-flex justify-content-around'>
          <Button
            variant='danger'
            onClick={handleFulfillmentDelete}
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
      <Card.Header>
        <div>{request_type}</div>
        <div>{created_date}</div>
      </Card.Header>
      <Card.Body>
        <Card.Title className='mb-3'>{title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted mb-3'>
          Status:
          {completed ? "fulfilled" : "unfulfilled"}
        </Card.Subtitle>
        <Card.Text className='mb-4'>{description}</Card.Text>
        {renderButtons()}
      </Card.Body>
    </Card>
  );
};

export default Task;
