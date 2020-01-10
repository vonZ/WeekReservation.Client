import React from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { LoadingWrapper } from "../shared";
import "./calendar.scss";

const Calendar = ({
  calendarNodes = [],
  setSelectedDate = () => {},
  shouldRenderEvents = false
}) => {
  const getEvents = () =>
    shouldRenderEvents
      ? calendarNodes.map(item => ({
          ...item,
          itemId: item.id,
          title: `${item.customer.firstName} ${item.customer.lastName} (${item.nrOfGuests} gäster)`,
          start: item.fromDate,
          end: item.toDate
        }))
      : [];

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
    editable: true,
    validRange: {
      start: "2020-03-01",
      end: "2020-09-01"
    },
    plugins: [dayGridPlugin, interactionPlugin],
    events: getEvents(),
    eventDrop: ({ event }) =>
      setSelectedDate({
        fromDate: event.start,
        toDate: event.end,
        ...event.extendedProps
      }),
    select: ({ startStr, endStr }) =>
      setSelectedDate({
        fromDate: startStr,
        toDate: endStr
      }),
    eventClick: ({ event }) =>
      setSelectedDate({
        title: event.title,
        fromDate: event.start,
        toDate: event.end,
        ...event.extendedProps
      })
  };

  return (
    <div className="calendar">
      <LoadingWrapper isActive={!shouldRenderEvents}>
        <FullCalendar {...fullCalendarProps} />
      </LoadingWrapper>
    </div>
  );
};

Calendar.propTypes = {
  calendarNodes: PropTypes.array,
  setSelectedDate: PropTypes.func,
  shouldRenderEvents: PropTypes.bool
};

export default Calendar;
