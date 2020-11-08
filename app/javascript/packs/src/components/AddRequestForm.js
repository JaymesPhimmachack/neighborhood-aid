import React, { useReducer, useEffect } from "react";
import LocationSearchInput from "./LocationSearchInput";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  .btn-style {
    width: 150px;
    height: 40px;
  }
  .form-style {
    margin-bottom: 50px;
  }
  .location-search-input {
    font-family: "Lato", sans-serif;
    width: 500px;
    height: 40px;
    background: none;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 1rem;
    color: black;
    font-weight: bold;
    margin-top: 300px;
    margin-left: 5rem;
  }

  .input-suggestion {
    font-family: "Lato", sans-serif;
    width: 500px;
    height: 60px;
    background-color: white;
    border-bottom: 1px black dotted;
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    color: black;
    margin-left: 5rem;
  }
`;

const AddRequestForm = ({
  userId,
  addRequestData,
  markerLatLng,
  markerAddress,
  handleCloseForm,
}) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      request_type: "",
      title: "",
      description: "",
      address: "",
      latitude: "",
      longitude: "",
      helper_quantity: "",
    }
  );

  const handleChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      request_type,
      title,
      description,
      address,
      latitude,
      longitude,
      helper_quantity,
    } = userInput;

    try {
      const { data } = await axios.post(
        "https://jp-neighborhood-aid.herokuapp.com/requests",
        {
          request: {
            owner_id: userId,
            request_type,
            title,
            description,
            address,
            latitude,
            longitude,
            helper_quantity,
          },
        },
        { withCredentials: true }
      );
      setUserInput({
        request_type: "",
        title: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        helper_quantity: "",
      });
      handleCloseForm();
      if (data) {
        addRequestData(data);
      }
    } catch (error) {
      console.log("add request error", error);
    }
  };

  useEffect(() => {
    setUserInput({
      latitude: markerLatLng.lat,
      longitude: markerLatLng.lng,
      address: markerAddress,
    });
  }, [markerLatLng, markerAddress]);

  return (
    <Styles>
      <h1 className='text-center mb-5'>Add Request</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='exampleForm.ControlSelect1'>
          <Form.Label>Request Type</Form.Label>
          <Form.Control
            as='select'
            name='request_type'
            value={userInput.request_type}
            onChange={handleChange}
          >
            <option disabled value=''>
              Select
            </option>
            <option value='one-time task'>One-time task</option>
            <option value='material needs'>Material needs</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={userInput.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={userInput.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <LocationSearchInput
            setUserInput={setUserInput}
            userAddress={userInput.address}
            markerAddress={markerAddress}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>How many volunteers do you need?</Form.Label>
          <Form.Control
            as='select'
            name='helper_quantity'
            value={userInput.helper_quantity}
            onChange={handleChange}
          >
            <option disabled value=''>
              Select
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add Request
        </Button>
      </Form>
    </Styles>
  );
};

export default AddRequestForm;
