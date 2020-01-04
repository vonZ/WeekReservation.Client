import gql from "graphql-tag";

export const GET_ALL_RESERVATIONS = gql`
  query getAllReservations {
    getAllReservations {
      id
      customerId
      fromDate
      toDate
      comment
      transportType
      nrOfGuests
      roomType
      payedInAdvanced
      rentOveralls
    }
  }
`;
