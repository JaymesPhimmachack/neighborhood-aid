import React, { Component } from "react";
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
`;

class AddRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      title: "",
      description: "",
      address: "",
      latitude: "",
      longitude: "",
      helper_quantity: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Styles>
        <h1 className='text-center mb-5'>Add Request</h1>
        <Form>
          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Request Type</Form.Label>
            <Form.Control as='select'>
              <option value='one-time task'>One-time task</option>
              <option value='material needs'>Material needs</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>How many helper do you need?</Form.Label>
            <Form.Control
              type='text'
              name='helper_quantity'
              value={this.state.helper_quantity}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Signup
          </Button>
        </Form>
      </Styles>
    );
  }
}

export default AddRequest;
