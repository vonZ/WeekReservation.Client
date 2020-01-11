import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "../modal/modal";
import FormContent from "./formContent";
import "./form-dialog.scss";

const FormDialog = ({
  open = false,
  selectedDate = {},
  customers = [],
  setSelectedDate = () => {},
  makeReservation = () => {},
  deleteReservationById = () => {}
}) => {
  const [modalIsOpen, setModalVisibility] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setModalVisibility(open);
  }, [open]);

  const saveEntry = () =>
    makeReservation({
      variables: formData
    }) && closeModal();

  const deleteEntry = () =>
    deleteReservationById({
      variables: { selectedItem: Number(selectedDate.itemId) }
    }) && closeModal();

  const closeModal = () => setSelectedDate({});

  const formContentProps = {
    selectedDate,
    customers,
    setFormData
  };

  return (
    <Modal open={modalIsOpen} handleClose={() => closeModal()}>
      <DialogTitle id="form-dialog-title">Lägg till en ny bokning</DialogTitle>
      <DialogContent>
        <FormContent {...formContentProps} />
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteEntry} color="secondary">
          Radera bokning
        </Button>
        <Button onClick={saveEntry} color="primary">
          Spara
        </Button>
      </DialogActions>
    </Modal>
  );
};

FormDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  selectedDate: PropTypes.object
};

export default FormDialog;
