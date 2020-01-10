import gql from "graphql-tag";

export const GET_ALL_ROOM_TYPES = gql`
  query getAllRoomTypes {
    getAllRoomTypes {
      id
      name
      type
      roomTypesAvailable
    }
  }
`;
