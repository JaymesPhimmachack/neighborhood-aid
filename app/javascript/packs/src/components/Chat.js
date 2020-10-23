import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import { RiSendPlaneFill } from "react-icons/fa";
import styled from "styled-components";

const StyleChat = styled.div`
  .avatar-lg {
    height: 3.125rem;
    min-height: 3.125rem;
    width: 3.125rem;
    min-width: 3.125rem;
  }

  .avatar {
    background: #f5f6fa;
    display: inline-block;
    position: relative;
    line-height: 0;
  }
  .avatar-image-lg {
    border-radius: 50%;
  }
  .avatar-sm {
    height: 2.75rem;
    min-height: 2.75rem;
    width: 2.75rem;
    min-width: 2.75rem;
  }
  .avatar-image-sm {
    height: 2.75rem;
    min-height: 2.75rem;
    width: 2.75rem;
    min-width: 2.75rem;
  }
  .message-group {
    height: 750px;
  }
`;

const Chat = () => {
  const [chatroom, setChatroom] = useState([]);

  const getChatroom = async () => {
    try {
      const response = await axios.get("http://localhost:3000/requests");

      console.log(response);
    } catch (error) {
      console.log("chatroom error", error);
    }
  };

  useEffect(() => {
    getChatroom();
  }, []);

  return (
    <StyleChat className='container-fluid mt-5'>
      <div className='row'>
        <div className='col-2 justify-content-around'>
          <ListGroup defaultActiveKey='#link1'>
            <ListGroup.Item action>Room 1</ListGroup.Item>
            <ListGroup.Item action>Room 2</ListGroup.Item>
            <ListGroup.Item action>Room 3</ListGroup.Item>
            <ListGroup.Item action>Room 4</ListGroup.Item>
            <ListGroup.Item action disabled>
              The are no rooms
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className='col-10'>
          <div className='row justify-content-around'>
            <div className='col-8'>
              <div className='message-group'>
                <div className='message'>
                  <div className='message-body'>
                    <h6>Matthew Wiggins</h6>
                    <div>
                      I'm going to meet a friend of mine at the department
                      store. Yeah, I have to buy some presents for my parents.
                    </div>
                    <div>8 mins ago</div>
                  </div>
                </div>
                <div className='message message-right'>
                  <div className='message-body'>
                    <h6>Simon Hensley</h6>
                    <div>
                      I'm going to meet a friend of mine at the department
                      store. Yeah, I have to buy some presents for my parents.
                    </div>
                    <div>8 mins ago</div>
                  </div>
                </div>
              </div>
              <div className='message-form'>
                <Form>
                  <Form.Label htmlFor='message' srOnly>
                    Message
                  </Form.Label>
                  <Form.Control
                    type='text'
                    id='message'
                    placeholder='Type your message...'
                    className='d-inline-block mr-2 w-75'
                  />

                  <Button type='submit' className='mb-2'>
                    <RiSendPlaneFill />
                  </Button>
                </Form>
              </div>
            </div>
            <div className='col-4'>
              <Card>
                <Card.Body>
                  <div className='media'>
                    <div className='media-body'>
                      <span>John Smith</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <div className='media'>
                    <div className='media-body'>
                      <span>John Smith</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </StyleChat>
  );
};

export default Chat;
