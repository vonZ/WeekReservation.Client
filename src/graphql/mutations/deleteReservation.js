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
        nrOfGuests
        customer {
          firstName
          lastName
        }
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
  }
`;
