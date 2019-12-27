import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Container from "react-bootstrap/Container";
import DataTable from "../components/dataTable";
import Calendar from "../components/calendar/calendar";
import FormDialog from "../components/formDialog/formDialog";

export const GET_ALL_RESERVATIONS = gql`
  query getAllReservations {
    getAllReservations {
      id
      userId
      fromDate
      toDate
      comment
      transportType
      payedInAdvanced
      rentOveralls
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($selectedItem: ID!) {
    deleteReservationById(id: $selectedItem) {
      success
      message
      reservations {
        id
        userId
        fromDate
        toDate
        comment
        transportType
        payedInAdvanced
        rentOveralls
        __typename
      }
    }
  }
`;

const Reservations = () => {
  const [selectedDate, setSelectedDate] = useState({});
  const { data: reservationData, loading, error } = useQuery(
    GET_ALL_RESERVATIONS
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

  // if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  const { getAllReservations: tableData } = reservationData;

  const dataTableProps = {
    tableData,
    deleteReservationById
  };

  const calendarProps = {
    tableData,
    deleteReservationById,
    setSelectedDate
  };

  const formDialogProps = {
    open: !!Object.keys(selectedDate).length,
    setSelectedDate,
    selectedDate
  };

  return (
    <React.Fragment>
      <Container>
        <Calendar {...calendarProps} />
        {/* <DataTable {...dataTableProps} /> */}
      </Container>
      <FormDialog {...formDialogProps} />
    </React.Fragment>
  );
};

export default Reservations;
