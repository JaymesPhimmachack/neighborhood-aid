import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Card, Form, Button } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import consumer from "../cable";
import styled from "styled-components";
import axios from "axios";

const StyleChatRoom = styled.div`
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

const ChatRoom = ({ fulfillments, owner, roomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const getMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/messages");
      console.log(data);
      // setMessages(data);
    } catch (error) {
      console.log("chatroom error", error);
    }
  };

  const getRoomData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/rooms/${roomId}`);
      console.log("get room data", data);
      // setCurrentRoom(data);
    } catch (error) {
      console.log("current room error", error);
    }
  };

  const renderMessages = () => {
    return fulfillments;
  };

  const renderUsers = () => {};

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/messages", {
        creator_id: user.id,
        fulfillment_id: 10,
        body: content,
      });
      console.log(data);
      // setCurrentRoom(data);
    } catch (error) {
      console.log("current room error", error);
    }
  };

  useEffect(() => {
    console.log(user);
    getRoomData();
    consumer.subscriptions.create(
      {
        channel: "ChatChannel",
        id: roomId,
      },
      {
        connected: () => console.log("connected"),
        disconnected: () => console.log("disconnected"),
        received: (data) => {
          console.log(data);
        },
      }
    );
  }, [roomId]);

  return (
    <React.Fragment>
      <div className='row justify-content-around'>
        <div className='col-8'>
          <div className='message-group'>
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
          <div className='message-form'>
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor='message' srOnly>
                Message
              </Form.Label>
              <Form.Control
                type='text'
                id='message'
                placeholder='Type your message...'
                className='d-inline-block mr-2 w-75'
                value={content}
                onChange={handleChange}
              />

              <Button type='submit' className='mb-2'>
                <IoMdSend />
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
    </React.Fragment>
  );
};

export default ChatRoom;
