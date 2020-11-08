import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Form, Button } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import consumer from "../cable";
import { ChatMember } from "./ChatMember";
import { Message } from "./Message";
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
    height: 600px;
    margin-bottom: 30px;
    overflow: hidden;
    overflow-y: scroll;
  }
`;

const ChatRoom = ({ id, user, members, setRoomMessages, roomMessages }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [chatDisconnected, setChatDisconnected] = useState(true);

  const handleChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jp-neighborhood-aid.herokuapp.com/messages",

        {
          creator_id: user.id,
          request_id: id,
          body: userMessage,
        }
      );
      setUserMessage("");
    } catch (error) {
      console.log("current room error", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    consumer.subscriptions.create(
      {
        channel: "ChatChannel",
        id: id,
      },
      {
        connected: () => {
          console.log("connected");
          setChatDisconnected(false);
        },
        disconnected: () => {
          setChatDisconnected(true);
          console.log("disconnected");
        },
        received: ({ message }) => {
          setRoomMessages((currentState) => [...currentState, message]);
          var elem = document.getElementById("message");
          elem.scrollTop = elem.scrollHeight;
        },
      }
    );
    return () => setIsMounted(false);
  }, [id]);

  return (
    <StyleChatRoom className='col-9'>
      <div className='row justify-content-around'>
        <div className='col-9'>
          <div className='message-group' id='message'>
            {isMounted && <Message messages={roomMessages} user={user} />}
          </div>
          <div className='message-form'>
            {isMounted && (
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor='message' srOnly>
                  Message
                </Form.Label>
                <Form.Control
                  type='text'
                  id='message'
                  placeholder='Type your message...'
                  className='d-inline-block mr-2 w-75'
                  value={userMessage}
                  onChange={handleChange}
                />

                <Button
                  type='submit'
                  className='mb-2'
                  disabled={chatDisconnected}
                >
                  <IoMdSend />
                </Button>
              </Form>
            )}
          </div>
        </div>
        <div className='col-3'>
          {isMounted && <ChatMember members={members} />}
        </div>
      </div>
    </StyleChatRoom>
  );
};

export default ChatRoom;
