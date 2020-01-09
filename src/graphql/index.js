import { GET_ALL_RESERVATIONS } from "./queries/getAllReservations";
import { GET_ALL_CUSTOMERS } from "./queries/getAllCustomers";
import { GET_ALL_ROOM_TYPES } from "./queries/getAllRoomTypes";
import { GET_RESERVATION_BY_CUSTOMER_ID } from "./queries/getReservationByCustomerId";
import { DELETE_RESERVATION } from "./mutations/deleteReservation";
import { MAKE_RESERVATION } from "./mutations/makeReservation";

export {
  GET_ALL_RESERVATIONS,
  GET_ALL_CUSTOMERS,
  GET_ALL_ROOM_TYPES,
  GET_RESERVATION_BY_CUSTOMER_ID,
  DELETE_RESERVATION,
  MAKE_RESERVATION
};
