import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
