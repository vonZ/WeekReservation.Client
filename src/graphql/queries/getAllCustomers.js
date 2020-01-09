import gql from "graphql-tag";

export const GET_ALL_CUSTOMERS = gql`
  query getAllCustomers {
    getAllCustomers {
      id
      firstName
      lastName
      email
      phoneNumber
      reservations {
        fromDate
        toDate
      }
    }
  }
`;
