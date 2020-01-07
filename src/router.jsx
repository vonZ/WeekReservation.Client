import React from "react";
import { Router } from "@reach/router";
import * as Pages from "./pages";

const RouterRoot = props => (
  <Router>
    <Pages.StartPage path="/" />
    <Pages.CalendarPage path="/calendar" />
    <Pages.CustomerPage path="/customers" />
  </Router>
);

export default RouterRoot;
