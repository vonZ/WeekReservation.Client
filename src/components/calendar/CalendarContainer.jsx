import React, { useState, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_ALL_RESERVATIONS,
  GET_ALL_CUSTOMERS,
  DELETE_RESERVATION,
  MAKE_RESERVATION
} from "../../graphql";
import Container from "@material-ui/core/Container";
import Calendar from "./calendar";
import FormDialog from "../formDialog/formDialog";

const CalendarContainer = props => {
  const [selectedDate, setSelectedDate] = useState({});

  const {
    data: reservationData,
    loading: reservationDataIsLoading,
    error: reservationDataHasError
  } = useQuery(GET_ALL_RESERVATIONS);

  const {
    data: customerData,
    loading: customerDataIsLoading,
    error: getUserHasError
  } = useQuery(GET_ALL_CUSTOMERS);

  const [deleteReservationById] = useMutation(DELETE_RESERVATION, {
    update(
      cache,
      {
        data: {
          deleteReservationById: { reservations }
        }
      }
    ) {
      cache.readQuery({
        query: GET_ALL_RESERVATIONS
      });

      cache.writeQuery({
        query: GET_ALL_RESERVATIONS,
        data: { getAllReservations: reservations }
      });
    }
  });

  const [makeReservation] = useMutation(MAKE_RESERVATION, {
    update(
      cache,
      {
        data: {
          makeReservation: { reservations }
        }
      }
    ) {
      cache.readQuery({
        query: GET_ALL_RESERVATIONS
      });

      cache.writeQuery({
        query: GET_ALL_RESERVATIONS,
        data: { getAllReservations: reservations }
      });
    }
  });

  if (reservationDataHasError || getUserHasError) return <p>ERROR</p>;

  const { getAllReservations: reservationNodes = [] } = reservationData;
  const { getAllCustomers: customers = [] } = customerData;

  const calendarNodes = reservationNodes.map(data => ({
    ...data,
    customer: customers.find(item => Number(item.id) === data.customerId) || []
  }));

  const shouldRenderEvents = () =>
    !reservationDataIsLoading && !customerDataIsLoading;

  const calendarProps = {
    calendarNodes,
    setSelectedDate,
    shouldRenderEvents: shouldRenderEvents()
  };

  const formDialogProps = {
    open: !!Object.keys(selectedDate).length,
    setSelectedDate,
    selectedDate,
    customers,
    makeReservation,
    deleteReservationById
  };

  return (
    <Fragment>
      <Container>
        <Calendar {...calendarProps} />
      </Container>
      <FormDialog {...formDialogProps} />
    </Fragment>
  );
};

export default CalendarContainer;
