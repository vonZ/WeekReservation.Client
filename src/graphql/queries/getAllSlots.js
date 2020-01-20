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
        payedInAdvanced
        rentOveralls
      }
    }
  }
`;
