import React from "react";
import styled from "styled-components";

const StyleMessage = styled.div`
  .message-body {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    width: 250px;
  }
`;

export const Message = ({ messages, user }) => {
  console.log(messages);
  return messages.map((message) => {
    return (
      <StyleMessage
        className={`d-flex my-2 ${
          message.creator_id === user.id ? "justify-content-end" : ""
        }`}
        key={message.id}
        id='message'
      >
        <div className='message-body'>
          <h6>
            {message.first_name} {message.last_name}
          </h6>
          <div>{message.content}</div>
          <small>{message.created_at}</small>
        </div>
      </StyleMessage>
    );
  });
};
