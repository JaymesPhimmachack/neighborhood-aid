import React, { useState, useEffect } from "react";
import Task from "./Task";
import styled from "styled-components";

const StyleMyRequest = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-gap: 10px;
`;

const MyRequest = ({ user, history, requestData }) => {
  const filteredRequest = () => {
    return requestData.filter((request) => {
      if (request.owner_id === user.id) {
        return request;
      }
    });
  };
  const renderRequests = () => {
    const requests = filteredRequest();

    if (requests.length > 0) {
      return requests.map(
        ({
          owner_id,
          id,
          title,
          request_type,
          description,
          helper_quantity,
          helper_fulfilled,
          created_date,
        }) => {
          if (owner_id === user.id) {
            return (
              <Task
                key={id}
                user={user}
                history={history}
                id={id}
                request_type={request_type}
                title={title}
                completed={helper_fulfilled === helper_quantity}
                description={description}
                created_date={created_date}
              />
            );
          }
        }
      );
    } else {
      return <div>No Open Request</div>;
    }
  };

  return (
    <div className='container mt-5'>{requestData && renderRequests()}</div>
  );
};

export default MyRequest;
