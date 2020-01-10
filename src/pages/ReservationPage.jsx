import React, { Fragment } from "react";
import { Header } from "../sections";
import ReservationContainer from "../components/reservations/ReservationContainer";

const ReservationPage = props => {
  return (
    <Fragment>
      <Header />
      <ReservationContainer />
    </Fragment>
  );
};

export default ReservationPage;
