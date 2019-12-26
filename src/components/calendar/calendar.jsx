import React from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./calendar.scss";

const Calendar = ({ tableData = [], deleteReservationById = () => {} }) => {
  const getEvents = () =>
    tableData.map(item => ({
      title: item.comment,
      start: item.fromDate,
      end: item.toDate
    }));

  const fullCalendarProps = {
    defaultView: "dayGridMonth",
    selectable: true,
    plugins: [dayGridPlugin, interactionPlugin],
    events: getEvents(),
    dateClick: arg => console.log({ arg }),
    select: arg => console.log({ arg })
  };

  return <FullCalendar {...fullCalendarProps} />;
};

Calendar.propTypes = {
  deleteReservationById: PropTypes.func,
  tableData: PropTypes.array
};

export default Calendar;
