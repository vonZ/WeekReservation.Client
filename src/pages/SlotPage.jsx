import React, { Fragment } from "react";
import { Header } from "../sections";
import SlotContainer from "../components/slots/SlotContainer";

const ReservationPage = props => {
  return (
    <Fragment>
      <Header />
      <SlotContainer />
    </Fragment>
  );
};

export default ReservationPage;
