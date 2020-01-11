import gql from "graphql-tag";

export const GET_ALL_SLOTS = gql`
  query getAllSlots {
    getAllSlots {
      id
      alias
      fromDate
      toDate
      capacity
    }
  }
`;
