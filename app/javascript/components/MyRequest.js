import React, { Component } from "react";
import Task from "./Task";
import styled from "styled-components";

class MyRequest extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <Task />
          </div>
          <div className='col-3'>
            <Task />
          </div>
          <div className='col-3'>
            <Task />
          </div>
          <div className='col-3'>
            <Task />
          </div>
        </div>
      </div>
    );
  }
}

export default MyRequest;
