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
      customer {
        firstName
        lastName
      }
      nrOfGuests
      roomType {
        id
        name
        type
        roomTypesAvailable
      }
      payedInAdvanced
      rentOveralls
    }
  }
`;
