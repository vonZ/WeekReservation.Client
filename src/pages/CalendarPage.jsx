import React, { Fragment } from "react";
import { Header } from "../sections";
import CalendarContainer from "../components/calendar/CalendarContainer";

const CalendarPage = props => {
  return (
    <Fragment>
      <Header />
      <CalendarContainer />
    </Fragment>
  );
};

export default CalendarPage;
