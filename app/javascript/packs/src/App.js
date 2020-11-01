import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Requests from "./components/Requests";
import AddRequestForm from "./components/AddRequestForm";
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

  const getRequestData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/requests");
      console.log("get requests", data);
      setRequestData(data);
    } catch (error) {
      console.log("Request Error", error);
    }
  };

  const getFulfillmentData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/fulfillments");
      console.log("get fulfillments", data);
      setFulfillmentData(data);
    } catch (error) {
      console.log("current room error", error);
    }
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
              <Requests {...props} user={user} requestData={requestData} />
            )}
          />
          <Route
            path='/pages/my-request'
            render={(props) => (
              <MyRequest {...props} user={user} requestData={requestData} />
            )}
          />
          <Route
            path='/pages/my-volunteer-work'
            render={(props) => (
              <MyVolunteerWork
                {...props}
                user={user}
                requestData={requestData}
                volunteer_id={fulfillmentData.volunteer_id}
                task_fulfilled={fulfillmentData.task_fulfilled}
              />
            )}
          />
          <Route
            path='/pages/chat'
            render={(props) => <Chat {...props} user={user} />}
          />
          <Route
            path='/pages/account'
            render={(props) => <Account {...props} user={user} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
