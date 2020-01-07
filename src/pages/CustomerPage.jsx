import React, { Fragment } from "react";
import { Header } from "../sections";
import CustomerContainer from "../components/customers/CustomerContainer";

const CalendarPage = props => {
  return (
    <Fragment>
      <Header />
      <CustomerContainer />
    </Fragment>
  );
};

export default CalendarPage;
