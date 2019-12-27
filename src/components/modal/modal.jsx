import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";

const Modal = ({ children, open = false, handleClose = () => {} }) => (
  <Dialog
    fullWidth={true}
    maxWidth={"sm"}
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    {children}
  </Dialog>
);

Modal.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default Modal;
