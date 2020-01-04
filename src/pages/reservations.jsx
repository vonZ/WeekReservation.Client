import React, { useState, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_ALL_RESERVATIONS,
  GET_ALL_CUSTOMERS,
  GET_ALL_ROOM_TYPES,
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

  const {
    data: customerData,
    loading: customerDataIsLoading,
    error: getUserHasError
  } = useQuery(GET_ALL_CUSTOMERS);

  const {
    data: roomTypesData,
    loading: roomTypesDataIsLoading,
    error: getRoomTypesError
  } = useQuery(GET_ALL_ROOM_TYPES);

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

  if (reservationDataHasError || getUserHasError || getRoomTypesError)
    return <p>ERROR</p>;

  const { getAllReservations: reservationNodes = [] } = reservationData;
  const { getAllCustomers: customers = [] } = customerData;
  const { getAllRoomTypes: roomTypes = [] } = roomTypesData;

  const calendarNodes = reservationNodes.map(data => ({
    ...data,
    customer: customers.find(item => Number(item.id) === data.customerId) || []
  }));
  // const dataTableProps = {
  //   tableData,
  //   deleteReservationById
  // };

  const shouldRenderEvents = () =>
    !reservationDataIsLoading &&
    !customerDataIsLoading &&
    !roomTypesDataIsLoading;

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
    roomTypes,
    makeReservation,
    deleteReservationById
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
