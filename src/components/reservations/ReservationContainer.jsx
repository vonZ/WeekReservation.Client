import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_RESERVATIONS } from "../../graphql";
import Container from "@material-ui/core/Container";
import ReservationTable from "./ReservationTable";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: 50
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  table: {
    width: "100%"
  },
  icon: {
    open: {
      color: "#ccc"
    },
    closed: {
      color: "#d50000"
    }
  }
}));

const mockWeekData = () => {
  let weeks = [];

  for (let i = 0; i < 30; i++) {
    weeks.push({
      weekNr: i + 1,
      date: `2020-0${i}-${i}`
    });
  }

  return weeks;
};

const ReservationContainer = props => {
  const {
    data: reservationNodes,
    loading: reservationDataIsLoading,
    error: getReservationHasError
  } = useQuery(GET_ALL_RESERVATIONS);

  const classes = useStyles();
  const { getAllReservations = [] } = reservationNodes;

  const shouldRenderCustomer = () =>
    !reservationDataIsLoading && !getReservationHasError;

  const reservationTableProps = {
    classes,
    reservationData: getAllReservations,
    shouldRenderEvents: shouldRenderCustomer(),
    mockWeekData: mockWeekData()
  };

  return (
    <Container>
      <div className={classes.section}>
        <Button variant="contained" color="primary" disableElevation>
          Ny reservation
        </Button>
        <div className={classes.tableContainer}>
          <ReservationTable {...reservationTableProps} />
        </div>
      </div>
    </Container>
  );
};

export default ReservationContainer;
