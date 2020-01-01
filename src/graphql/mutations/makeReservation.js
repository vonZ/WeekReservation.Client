import gql from "graphql-tag";

export const MAKE_RESERVATION = gql`
  mutation makeReservation(
    $customerId: Int!
    $fromDate: String
    $toDate: String
    $comment: String
    $transportType: String
    $payedInAdvanced: Boolean
    $rentOveralls: Boolean
  ) {
    makeReservation(
      customerId: $customerId
      fromDate: $fromDate
      toDate: $toDate
      comment: $comment
      transportType: $transportType
      payedInAdvanced: $payedInAdvanced
      rentOveralls: $rentOveralls
    ) {
      success
      message
      reservations {
        id
        customerId
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
