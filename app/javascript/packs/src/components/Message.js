import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const StyleMessage = styled.div`
  .message-body {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    width: 250px;
  }
  .img-msg-style {
    width: 35px;
  }
  .my-img-msg-style {
    margin-left: 10px;
    margin-right: 5px;
  }
  .others-img-msg-style {
    margin-right: 10px;
  }
`;

export const Message = ({ messages, user }) => {
  return messages.map((message) => {
    return (
      <StyleMessage
        className={`d-flex my-2 align-items-end justify-content-end ${
          message.creator_id !== user.id ? "flex-row-reverse" : ""
        }`}
        key={message.id}
        id='message'
      >
        <div className='message-body'>
          <div>
            {message.first_name} {message.last_name}
          </div>
          <div>{message.content}</div>
          <small>{message.created_at}</small>
        </div>
        <div
          className={`img-msg-style ${
            message.creator_id !== user.id
              ? "justify-content-end flex-row-reverse align-items-end others-img-msg-style"
              : "my-img-msg-style"
          }`}
        >
          <Avatar photoUrl={message.photo_url} />
        </div>
      </StyleMessage>
    );
  });
};
