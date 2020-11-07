import React, { useEffect } from "react";
import Task from "./Task";
import styled from "styled-components";

const StyleMyRequest = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  grid-gap: 10px;
`;

const MyRequest = ({
  user,
  history,
  requestData,
  updateRequestData,
  deleteRequestData,
  loggedInStatus,
}) => {
  useEffect(() => {
    if (loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/");
    }
  }, [loggedInStatus]);

  const filteredRequest = () => {
    return requestData.filter((request) => {
      if (request.owner.id === user.id) {
        return request;
      }
    });
  };
  const renderRequests = () => {
    const requests = filteredRequest();

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
          render_state,
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
              render_state={render_state}
              updateRequestData={updateRequestData}
              deleteRequestData={deleteRequestData}
            />
          );
        }
      );
    } else {
      return <div>No Open Request</div>;
    }
  };

  return (
    <StyleMyRequest className='container mt-5'>
      {requestData && renderRequests()}
    </StyleMyRequest>
  );
};

export default MyRequest;
