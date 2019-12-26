import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DataTable from "../components/dataTable";

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
      const { getAllReservations } = cache.readQuery({
        query: GET_ALL_RESERVATIONS
      });
      console.log(getAllReservations);
      console.log(reservations);

      cache.writeQuery({
        query: GET_ALL_RESERVATIONS,
        data: { getAllReservations: reservations }
      });
    }
  });

  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  const { getAllReservations: tableData } = reservationData;

  const dataTableProps = {
    tableData,
    deleteReservationById
  };

  return <DataTable {...dataTableProps} />;
};

export default Reservations;
