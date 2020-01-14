import gql from "graphql-tag";

export const GET_ALL_SLOTS = gql`
  query getAllSlots {
    getAllSlots {
      id
      alias
      fromDate
      toDate
      capacity
      reservations {
        id
        fromDate
        toDate
        customer {
          id
          firstName
          lastName
          nrOfReservations
          phoneNumber
          email
        }
        comment
      }
    }
  }
`;
