import React, { useEffect } from "react";
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
  updateFulfillmentData,
  deleteFulfillmentData,
  loggedInStatus,
}) => {
  useEffect(() => {
    if (loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/");
    }
  }, [loggedInStatus]);

  const filteredRequest = () => {
    return requestData.filter((request) => {
      return request.fulfillments.find(
        ({ volunteer_id }) => volunteer_id === user.id
      );
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
          fulfillments,
        }) => {
          const filteredFulfillment = fulfillments.filter(
            (fulfillment) => user.id === fulfillment.volunteer_id
          );
 
          return (
            <Task
              key={id}
              user={user}
              history={history}
              requestId={id}
              id={id}
              request_type={request_type}
              title={title}
              description={description}
              created_date={created_date}
              volunteer_id={filteredFulfillment[0].volunteer_id}
              task_fulfilled={filteredFulfillment[0].task_fulfilled}
              fulfillmentId={filteredFulfillment[0].id}
              updateFulfillmentData={updateFulfillmentData}
              deleteFulfillmentData={deleteFulfillmentData}
            />
          );
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
