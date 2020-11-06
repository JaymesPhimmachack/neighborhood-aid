import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Requests from "./components/Requests";
import MyRequest from "./components/MyRequest";
import MyVolunteerWork from "./components/MyVolunteerWork";
import Chat from "./components/Chat";
import Account from "./components/Account";
import axios from "axios";

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [showBtnClick, setBtnClick] = useState("signin");
  const [requestData, setRequestData] = useState(null);
  const [fulfillmentData, setFulfillmentData] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (event) => {
    setBtnClick(event.target.name);
    setShow(true);
  };

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    console.log("Login data", data);
    setUser(data);
  };

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({});
  };

  const checkLoginStatus = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/logged_in", {
        withCredentials: true,
      });

      if (data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        setLoggedInStatus("LOGGED_IN");
        setUser(data);
      } else if (!data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser({});
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  const updateUser = (newUserData) => {
    setUser({ ...user, ...newUserData });
  };

  const deleteUser = () => {
    setUser({});
  };

  // Request functions
  const getRequestData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/requests");

      setRequestData(data);
    } catch (error) {
      console.log("Request Error", error);
    }
  };

  const addRequestData = (newRequestData) => {
    setRequestData([...requestData, newRequestData]);
  };

  const updateRequestData = (newRequestData) => {
    const filteredRequest = requestData.filter(
      (request) => request.id !== newRequestData.id
    );

    setRequestData([...filteredRequest, newRequestData]);
  };

  const deleteRequestData = (id) => {
    const newRequest = requestData.filter((request) => request.id !== id);

    setRequestData(newRequest);
  };

  // Fulfillment functions
  const getFulfillmentData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/fulfillments");

      setFulfillmentData(data);
    } catch (error) {
      console.log("current room error", error);
    }
  };

  const addFulfillmentData = (newFulfillmentData) => {
    setFulfillmentData([...fulfillmentData, newFulfillmentData]);

    // Look for request to update
    const foundRequest = requestData.find(
      (request) => request.id === newFulfillmentData.request_id
    );
    // Filter out old request
    const filteredRequest = requestData.filter(
      (request) => request.id !== newFulfillmentData.request_id
    );
    // Make a copy of the request
    const requestCopy = Object.assign({}, foundRequest);

    // Make a copy of the fulfillments
    const newFulfillments = [...foundRequest.fulfillments, newFulfillmentData];
    // Add new fulfillments to new request
    requestCopy.fulfillments = newFulfillments;
    // Update with new request
    setRequestData([...filteredRequest, requestCopy]);
  };

  const updateFulfillmentData = (fulfillmentId) => {
    const foundFulfillment = fulfillmentData.find(
      (fulfillment) => fulfillment.id === fulfillmentId
    );

    const newFulfillment = { ...foundFulfillment, task_fulfilled: true };

    // Filter out old fulfillment
    const filteredFulfillments = fulfillmentData.filter(
      (fulfillment) => fulfillment.id !== fulfillmentId
    );

    // Look for request to update
    const foundRequest = requestData.find(
      (request) => request.id === newFulfillment.request_id
    );
    // Make a copy of the request
    const requestCopy = Object.assign({}, foundRequest);

    // Filter out old request
    const filteredRequest = requestData.filter(
      (request) => request.id !== newFulfillment.request_id
    );

    // Make a copy of the fulfillment
    const newFulfillments = [...filteredFulfillments, newFulfillment];

    // Add new fulfillments to new request
    requestCopy.fulfillments = newFulfillments;
    // Update with new request and new fulfillment
    setRequestData([...filteredRequest, requestCopy]);
    setFulfillmentData([...filteredFulfillments, newFulfillment]);
  };

  const deleteFulfillmentData = (fulfillmentId, requestId) => {
    const newFulfillment = fulfillmentData.filter(
      (fulfillment) => fulfillment.id !== fulfillmentId
    );

    // Look for request to update
    const foundRequest = requestData.find(
      (request) => request.id === requestId
    );

    // Make a copy of the request
    const requestCopy = Object.assign({}, foundRequest);

    // Look for fulfillment to update
    const filteredRequestFulfillment = foundRequest.fulfillments.filter(
      (fulfillment) => fulfillment.id !== fulfillmentId
    );

    requestCopy.fulfillments = filteredRequestFulfillment;

    // Filter out old request
    const filteredRequest = requestData.filter(
      (request) => request.id !== requestId
    );

    // Update with new request
    setRequestData([...filteredRequest, requestCopy]);

    // Update fulfillment
    setFulfillmentData(newFulfillment);
  };

  useEffect(() => {
    // checkLoginStatus();
    getRequestData();
    getFulfillmentData();
  }, []);

  return (
    <div>
      <Router>
        <Header
          handleLogout={handleLogout}
          handleShow={handleShow}
          name={user.first_name}
        />
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Home
                {...props}
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                showBtnClick={showBtnClick}
              />
            )}
          />
          <Route
            path='/pages/requests'
            render={(props) => (
              <Requests
                {...props}
                user={user}
                requestData={requestData}
                addRequestData={addRequestData}
                addFulfillmentData={addFulfillmentData}
              />
            )}
          />
          <Route
            path='/pages/my-request'
            render={(props) => (
              <MyRequest
                {...props}
                user={user}
                requestData={requestData}
                updateRequestData={updateRequestData}
                deleteRequestData={deleteRequestData}
                fulfillmentData={fulfillmentData}
              />
            )}
          />
          <Route
            path='/pages/my-volunteer-work'
            render={(props) => (
              <MyVolunteerWork
                {...props}
                user={user}
                requestData={requestData}
                fulfillmentData={fulfillmentData}
                updateFulfillmentData={updateFulfillmentData}
                deleteFulfillmentData={deleteFulfillmentData}
              />
            )}
          />
          <Route
            path='/pages/chat'
            render={(props) => <Chat {...props} user={user} />}
          />
          <Route
            path='/pages/account'
            render={(props) => (
              <Account
                {...props}
                user={user}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
