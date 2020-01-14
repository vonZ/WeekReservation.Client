import gql from "graphql-tag";

export const CREATE_SLOT = gql`
  mutation createSlot(
    $alias: String
    $fromDate: String
    $toDate: String
    $capacity: Int
  ) {
    createSlot(
      alias: $alias
      fromDate: $fromDate
      toDate: $toDate
      capacity: $capacity
    ) {
      success
      message
      slots {
        id
        alias
        fromDate
        toDate
        capacity
      }
    }
  }
`;
