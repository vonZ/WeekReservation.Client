import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALL_SLOTS, CREATE_SLOT } from "../../graphql";
import Container from "@material-ui/core/Container";
import SlotTable from "./SlotTable/SlotTable";
import SlotFormContainer from './SlotForm/SlotFormContainer';
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

const SlotContainer = () => {
  const {
    data: slotNodes,
    loading: slotDataIsLoading,
    error: getAllSlotsHasError
  } = useQuery(GET_ALL_SLOTS);

  const [createSlot] = useMutation(CREATE_SLOT, {
    update(
      cache,
      {
        data: {
          createSlot: { slots }
        }
      }
    ) {
      cache.readQuery({
        query: GET_ALL_SLOTS
      });

      cache.writeQuery({
        query: GET_ALL_SLOTS,
        data: { getAllSlots: slots }
      });
    }
  });

  const [selectedSlot, setSelectedSlot] = useState({});
  const [modalIsOpen, setModalVisibility] = useState(false);

  const classes = useStyles();
  const { getAllSlots: slotData = [] } = slotNodes;

  const shouldRenderSlots = () => !slotDataIsLoading && !getAllSlotsHasError;

  const reservationTableProps = {
    classes,
    slotData,
    shouldRenderEvents: shouldRenderSlots()
  };

  const reservationFormContainerProps = {
    modalIsOpen,
    setModalVisibility,
    selectedSlot,
    setSelectedSlot,
    createSlot
  }

  return (
    <Container>
      <div className={classes.section}>
        <Button onClick={() => setModalVisibility(true)} variant="contained" color="primary" disableElevation>
          Ny slot
        </Button>
        <div className={classes.tableContainer}>
          <SlotTable {...reservationTableProps} />
        </div>
      </div>
      <SlotFormContainer {...reservationFormContainerProps} />
    </Container>
  );
};

export default SlotContainer;
