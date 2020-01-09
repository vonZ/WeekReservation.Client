import gql from "graphql-tag";

export const GET_RESERVATION_BY_CUSTOMER_ID = gql`
  query getReservationByCustomerId($customerId: ID!) {
    getReservationByCustomerId(customerId: $customerId) {
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
