import React from "react";
import ReactDOM from "react-dom";
import IndecisionApp from "./components/IndecisionApp";
// reset css
import 'normalize.css/normalize.css'
import './styles/styles.scss'
ReactDOM.render(
  <IndecisionApp options={["YES", "NO"]} />,
  document.getElementById("app")
);
