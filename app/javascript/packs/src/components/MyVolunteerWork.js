import React, { UseState, useEffect } from "react";
import Task from "./Task";
import styled from "styled-components";

const StyleMyVolunteerWork = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-gap: 10px;
`;

const MyVolunteerWork = ({
  user,
  history,
  requestData,
  volunteer_id,
  task_fulfilled,
}) => {
  const filteredRequest = () => {
    return requestData.filter((request) => {
      if (volunteer_id === user.id) {
        return request;
      }
    });
  };

  const renderFulfillments = () => {
    const requests = filteredRequest();

    if (requests.length > 0) {
      return requests.filter(
        ({ id, title, request_type, description, created_date }) => {
          if (volunteer_id === user.id) {
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
              />
            );
          }
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
