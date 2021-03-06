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
  const [location, setLocation] = useState({
    latitude: 40.774,
    longitude: -74.125,
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (event) => {
    setBtnClick(event.target.name);
    setShow(true);
  };

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data);
  };

  const handleLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({});
  };

  const checkLoginStatus = async () => {
    try {
      const { data } = await axios.get(
        "https://jp-neighborhood-aid.herokuapp.com/logged_in",

        {
          withCredentials: true,
        }
      );

      if (data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
        setLoggedInStatus("LOGGED_IN");
        setUser(data);
      } else if (!data.logged_in && loggedInStatus === "LOGGED_IN") {
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
      const { data } = await axios.get("https://jp-neighborhood-aid.herokuapp.com/requests");
      setRequestData(data);
    } catch (error) {
      console.log("request error", error);
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
      const { data } = await axios.get("https://jp-neighborhood-aid.herokuapp.com/fulfillments");

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
    // console.log("addFulfillmentData", [...filteredRequest, requestCopy]);
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

  const deleteUserData = (userId) => {
    const newRequest = requestData.filter((request) => request.id !== userId);

    setRequestData(newRequest);

    const newFulfillment = fulfillmentData.filter(
      (fulfillment) => fulfillment.id !== userId
    );

    // Update fulfillment
    setFulfillmentData(newFulfillment);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function error(err) {
          // for when getting location results in an error
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log("geolocation is not enabled on this browser");
    }
  };

  useEffect(() => {
    checkLoginStatus();
    getRequestData();
    getFulfillmentData();
    getUserLocation();
  }, []);

  return (
    <div>
      <Router>
        <Header
          handleLogout={handleLogout}
          handleShow={handleShow}
          loggedInStatus={loggedInStatus}
          user={user}
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
                loggedInStatus={loggedInStatus}
                location={location}
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
                loggedInStatus={loggedInStatus}
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
                loggedInStatus={loggedInStatus}
              />
            )}
          />
          <Route
            path='/pages/chat'
            render={(props) => (
              <Chat {...props} user={user} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            path='/pages/account'
            render={(props) => (
              <Account
                {...props}
                user={user}
                updateUser={updateUser}
                deleteUser={deleteUser}
                setLoggedInStatus={setLoggedInStatus}
                setUser={setUser}
                deleteUserData={deleteUserData}
                loggedInStatus={loggedInStatus}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
