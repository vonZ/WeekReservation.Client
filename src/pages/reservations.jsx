import React, { useState, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_ALL_RESERVATIONS,
  GET_ALL_CUSTOMERS,
  DELETE_RESERVATION,
  MAKE_RESERVATION
} from "../graphql";
import Container from "@material-ui/core/Container";
import DataTable from "../components/dataTable";
import Calendar from "../components/calendar/calendar";
import FormDialog from "../components/formDialog/formDialog";

const Reservations = () => {
  const [selectedDate, setSelectedDate] = useState({});
  const {
    data: reservationData,
    loading: reservationDataIsLoading,
    error: reservationDataHasError
  } = useQuery(GET_ALL_RESERVATIONS);
  const { data: customerDate, error: getUserHasError } = useQuery(
    GET_ALL_CUSTOMERS
  );

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

  // if (reservationDataIsLoading) return <p>LOADING</p>;
  if (reservationDataHasError) return <p>ERROR</p>;

  const { getAllReservations: reservationNodes } = reservationData;
  const { getAllCustomers: customers } = customerDate;

  // const dataTableProps = {
  //   tableData,
  //   deleteReservationById
  // };

  const calendarProps = {
    reservationNodes,
    deleteReservationById,
    setSelectedDate
  };

  const formDialogProps = {
    open: !!Object.keys(selectedDate).length,
    setSelectedDate,
    selectedDate,
    customers,
    makeReservation
  };

  return (
    <Fragment>
      <Container>
        <Calendar {...calendarProps} />
        {/* <DataTable {...dataTableProps} /> */}
      </Container>
      <FormDialog {...formDialogProps} />
    </Fragment>
  );
};

export default Reservations;
