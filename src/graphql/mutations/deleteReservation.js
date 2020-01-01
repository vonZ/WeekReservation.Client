import gql from "graphql-tag";

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
