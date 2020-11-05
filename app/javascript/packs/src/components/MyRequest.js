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
      if (request.owner.id === user.id) {
        return request;
      }
    });
  };
  const renderRequests = () => {
    const requests = filteredRequest();
    console.log(requests);
    if (requests.length > 0) {
      return requests.map(
        ({
          id,
          title,
          request_type,
          description,
          helper_quantity,
          helper_fulfilled,
          created_date,
          disable_republish,
        }) => {
          return (
            <Task
              key={id}
              user={user}
              history={history}
              requestId={id}
              request_type={request_type}
              title={title}
              completed={helper_fulfilled === helper_quantity}
              description={description}
              created_date={created_date}
              disable_republish={disable_republish}
            />
          );
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
