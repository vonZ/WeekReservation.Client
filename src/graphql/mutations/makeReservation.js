import gql from "graphql-tag";

export const MAKE_RESERVATION = gql`
  mutation makeReservation(
    $customerId: Int!
    $fromDate: String
    $toDate: String
    $comment: String
    $transportType: String
    $roomType: Int
    $payedInAdvanced: Boolean
    $rentOveralls: Boolean
  ) {
    makeReservation(
      customerId: $customerId
      fromDate: $fromDate
      toDate: $toDate
      comment: $comment
      transportType: $transportType
      nrOfGuests: 2
      roomType: $roomType
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
        roomType
        nrOfGuests
        payedInAdvanced
        rentOveralls
      }
    }
  }
`;
