import gql from "graphql-tag";

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($selectedItem: ID!) {
    deleteReservationById(id: $selectedItem) {
      success
      message
      reservations {
        id
        customerId
        fromDate
        toDate
        comment
        transportType
        roomType
        nrOfGuests
        payedInAdvanced
        rentOveralls
      }
    }
  }
`;
