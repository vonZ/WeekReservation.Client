import React from "react";
import { Router } from "@reach/router";
import { ReservationPage } from "./pages";

const RouterRoot = props => {
  return (
    <Router>
      <ReservationPage path="/reservations" />
    </Router>
  );
};

RouterRoot.propTypes = {};

export default RouterRoot;
