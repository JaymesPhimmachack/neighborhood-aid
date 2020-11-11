import React from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

const Task = ({
  user,
  history,
  requestId,
  title,
  request_type,
  description,
  created_date,
  handlePopupClose,
  completed,
  task_fulfilled,
  fulfillmentId,
  handleVolunteerClick,
  addFulfillmentData,
  updateFulfillmentData,
  deleteFulfillmentData,
  updateRequestData,
  deleteRequestData,
  shouldDisable,
}) => {
  const handleRepublish = async () => {
    try {
      const { data } = await axios.patch(
        `https://jp-neighborhood-aid.herokuapp.com/requests/${requestId}`
      );
      updateRequestData(data);
    } catch (error) {
      console.log("report error", error);
    }
  };

  const handleRequestDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://jp-neighborhood-aid.herokuapp.com/requests/${requestId}`
      );

      deleteRequestData(requestId);
    } catch (error) {
      console.log("task completed error", error);
    }
  };

  const handleFulfillmentDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://jp-neighborhood-aid.herokuapp.com/fulfillments/${fulfillmentId}`
      );

      deleteFulfillmentData(fulfillmentId, requestId);
    } catch (error) {
      console.log("delete error", error);
    }
  };

  const handleFulfillmentUpdate = async () => {
    try {
      const { data } = await axios.patch(
        `https://jp-neighborhood-aid.herokuapp.com/fulfillments/${fulfillmentId}`,


        {
          request_id: requestId,
          volunteer_id: user.id,
          task_fulfilled: true,
        }
      );

      updateFulfillmentData(fulfillmentId);
    } catch (error) {
      console.log("fulfillment error", error);
    }
  };

  const handleVolunteer = async () => {
    try {
      const { data } = await axios.post(
        "https://jp-neighborhood-aid.herokuapp.com/fulfillments",

        {
          request_id: requestId,
          volunteer_id: user.id,
        }
      );

      if (data) {
        addFulfillmentData(data);
        handleVolunteerClick();
      }
    } catch (error) {
      console.log("volunteer error", error);
    }
  };

  const calculateDisabledTime = () => {
    const dt1 = new Date(created_date);
    const dt2 = new Date();

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff)) < 24;
  };

  const renderButtons = () => {
    if (history.location.pathname === "/pages/my-request") {
      return (
        <div className='d-flex justify-content-around'>
          <Button
            variant='danger'
            onClick={handleRequestDelete}
            disabled={completed || task_fulfilled}
          >
            Delete
          </Button>
          <Button
            variant='secondary'
            onClick={handleRepublish}
            disabled={completed || calculateDisabledTime()}
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
            onClick={handleFulfillmentUpdate}
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
          <Button
            variant='primary'
            onClick={handleVolunteer}
            disabled={shouldDisable}
          >
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
          {completed || task_fulfilled ? "fulfilled" : "unfulfilled"}
        </Card.Subtitle>
        <Card.Text className='mb-4'>{description}</Card.Text>
        {renderButtons()}
      </Card.Body>
    </Card>
  );
};

export default Task;
