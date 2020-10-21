import React from "react";
import Avatar from "./Avatar";
import { Card, Form, Button, Col } from "react-bootstrap";
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
`;

const Chat = () => (
  <StyleChat className='container'>
    <div className='row'>
      <div className='col-4 justify-content-around'>
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
      <div className='col-8'>
        <div className='row justify-content-around'>
          <div className='message'>
            <div className='message-body'>
              <h6>Matthew Wiggins</h6>
              <div>
                I'm going to meet a friend of mine at the department store.
                Yeah, I have to buy some presents for my parents.
              </div>
              <div>8 mins ago</div>
            </div>
          </div>
          <div className='message message-right'>
            <div className='message-body'>
              <h6>Simon Hensley</h6>
              <div>
                I'm going to meet a friend of mine at the department store.
                Yeah, I have to buy some presents for my parents.
              </div>
              <div>8 mins ago</div>
            </div>
          </div>
        </div>
        <div className='row'>
          <Form>
            <Form.Row className='align-items-center'>
              <Col xs='auto'>
                <Form.Label htmlFor='inlineFormInput' srOnly>
                  Name
                </Form.Label>
                <Form.Control
                  className='mb-2'
                  id='inlineFormInput'
                  placeholder='Type your message...'
                />
              </Col>
              <Col xs='auto'>
                <Button type='submit' className='mb-2'>
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </div>
      </div>
    </div>
  </StyleChat>
);

export default Chat;
