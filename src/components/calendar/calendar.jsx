import React from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import "./calendar.scss";

const Calendar = ({
  reservationNodes = [],
  deleteReservationById = () => {},
  setSelectedDate = () => {}
}) => {
  const getEvents = () =>
    reservationNodes.map(item => ({
      ...item,
      title: item.comment,
      start: item.fromDate,
      end: item.toDate
    }));

  const fullCalendarProps = {
    defaultView: "dayGridMonth",
    locale: svLocale,
    selectable: true,
    header: {
      left: "prev,next today",
      right: "title"
    },
    titleFormat: {
      month: "long",
      year: "numeric"
    },
    weekNumbers: true,
    plugins: [dayGridPlugin, interactionPlugin],
    events: getEvents(),
    select: ({ startStr, endStr }) =>
      setSelectedDate({
        fromDate: startStr,
        toDate: endStr
      }),
    eventClick: ({ event }) =>
      setSelectedDate({
        title: event.title,
        fromDate: event.start.toLocaleDateString(),
        toDate: event.end.toLocaleDateString(),
        ...event.extendedProps
      })

    // unselect: () => setSelectedDate({})
  };

  return (
    <div className="calendar">
      <FullCalendar {...fullCalendarProps} />
    </div>
  );
};

Calendar.propTypes = {
  deleteReservationById: PropTypes.func,
  tableData: PropTypes.array
};

export default Calendar;
