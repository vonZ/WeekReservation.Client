import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "../../modal/modal";
import SlotForm from "./SlotForm";
import "./form-dialog.scss";

const SlotFormContainer = ({
  modalIsOpen = false,
  setModalVisibility = () => {},
  selectedSlot = {},
  setSelectedSlot = () => {},
  createSlot = () => {}
}) => {
  const [formData, setFormData] = useState({});

  const saveEntry = () =>
    createSlot({
      variables: formData
    }) && closeModal();

  const closeModal = () => setModalVisibility(false);

  const formContentProps = {
    setSelectedSlot,
    saveEntry,
    setFormData
  };

  return (
    <Modal open={modalIsOpen} handleClose={() => closeModal(false)}>
      <DialogTitle id="form-dialog-title">Lägg till en ny slot</DialogTitle>
      <DialogContent>
        <SlotForm {...formContentProps} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Avbryt</Button>
        <Button onClick={saveEntry} color="primary">
          Spara
        </Button>
      </DialogActions>
    </Modal>
  );
};

SlotFormContainer.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  selectedDate: PropTypes.object
};

export default SlotFormContainer;
