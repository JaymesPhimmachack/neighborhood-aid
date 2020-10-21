import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import Requests from "../components/Requests";
import AddRequest from "../components/AddRequest";
import MyRequest from "../components/MyRequest";
import Chat from "../components/Chat";
import Account from "../components/Account";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [showBtnClick, setBtnClick] = useState("signin");

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

  useEffect(() => {
    // checkLoginStatus();
  }, []);

  return (
    <div>
      <Router>
        <Header handleLogout={handleLogout} handleShow={handleShow} />
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

          <Route path='/pages/requests' component={Requests} />
          <Route path='/pages/add-request' component={AddRequest} />
          <Route path='/pages/my-request' component={MyRequest} />
          <Route path='/pages/chat' component={Chat} />
          <Route path='/pages/account' component={Account} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
