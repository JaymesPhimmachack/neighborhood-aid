import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import LogIn from "../components/auth/LogIn";
import Registration from "../components/auth/Registration";
import Requests from "../components/Requests";
import CreateRequest from "../components/CreateRequest";
import MyRequest from "../components/MyRequest";
import Chat from "../components/Chat";
import Account from "../components/Account";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  };

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  };

  checkLoginStatus = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/logged_in", {
        withCredentials: true,
      });

      if (data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: data.user,
        });
      } else if (!data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
      }
    } catch (error) {
      console.log("registration error", error);
    }
  };

  render() {
    return (
      <div>
        <Router>
          <Header handleLogout={this.handleLogout} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route path='/pages/requests' component={Requests} />
            <Route path='/pages/create-request' component={CreateRequest} />
            <Route path='/pages/my-request' component={MyRequest} />
            <Route path='/pages/chat' component={Chat} />
            <Route path='/pages/account' component={Account} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
