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
  setSelectedDate = () => {},
  selectedDate = {}
}) => {
  const [modalIsOpen, setModalVisibility] = useState(false);

  useEffect(() => {
    setModalVisibility(open);
  }, [open]);

  return (
    <Modal open={modalIsOpen} handleClose={() => setSelectedDate({})}>
      <DialogTitle id="form-dialog-title">Lägg till en ny bokning</DialogTitle>
      <DialogContent>
        <FormContent selectedDate={selectedDate} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedDate({})} color="primary">
          Avbryt
        </Button>
        <Button onClick={() => setSelectedDate({})} color="primary">
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
