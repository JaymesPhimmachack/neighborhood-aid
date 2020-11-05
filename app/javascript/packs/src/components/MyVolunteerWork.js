import React, { UseState, useEffect } from "react";
import Task from "./Task";
import styled from "styled-components";

const StyleMyVolunteerWork = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-gap: 10px;
`;

const MyVolunteerWork = ({ user, history, requestData, task_fulfilled }) => {
  const filteredRequest = () => {
    return requestData.filter((request) => {
      let result = null;
      request.fulfillments.forEach(({ volunteer_id }) => {
        if (volunteer_id === user.id) {
          result = true;
        } else {
          result = false;
        }
      });
      if (result) {
        return request;
      }
    });
  };

  const renderFulfillments = () => {
    const requests = filteredRequest();
    if (requests.length > 0) {
      return requests.map(
        ({
          id,
          title,
          request_type,
          description,
          created_date,
          volunteer_id,
          fulfillments,
        }) => {
          return fulfillments.map((fulfillment) => {
            if (user.id === fulfillment.volunteer_id) {
              return (
                <Task
                  key={id}
                  user={user}
                  history={history}
                  id={id}
                  request_type={request_type}
                  title={title}
                  description={description}
                  created_date={created_date}
                  volunteer_id={volunteer_id}
                  task_fulfilled={task_fulfilled}
                  fulfillmentId={fulfillment.id}
                />
              );
            }
          });
        }
      );
    } else {
      return <div>No Volunteer Work</div>;
    }
  };

  return (
    <StyleMyVolunteerWork className='container mt-5'>
      {requestData && renderFulfillments()}
    </StyleMyVolunteerWork>
  );
};

export default MyVolunteerWork;
