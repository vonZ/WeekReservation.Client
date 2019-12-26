import React, { useState, useEffect } from "react";
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
    }
  }
`;

const Reservations = () => {
  const { data: reservationData, loading, error } = useQuery(
    GET_ALL_RESERVATIONS
  );

  const [deleteReservation] = useMutation(DELETE_RESERVATION);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  const { getAllReservations: tableData } = reservationData;

  const dataTableProps = {
    tableData,
    deleteReservation
  };

  return <DataTable {...dataTableProps} />;
};

export default Reservations;
