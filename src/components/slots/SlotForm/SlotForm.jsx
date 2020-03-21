import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import svLocale from "date-fns/locale/sv";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none"
  },
  textInput: {
    marginTop: 5,
    marginBottom: 4
  },
  dateInput: {
    marginRight: 10
  }
}));

const SlotForm = ({ selectedSlot = {}, setFormData = () => {} }) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    ...selectedSlot,
    alias: selectedSlot.alias || "Vecka XX",
    fromDate: selectedSlot.fromDate || Date.now(),
    toDate: selectedSlot.toDate || Date.now(),
    capacity: selectedSlot.capacity || 4
  });

  useEffect(() => {
    setFormData(formValues);
  }, [formValues, setFormData]);

  const inputOnChange = (name, value) => {
    setFormValues(values => ({
      ...values,
      [name]: value
    }));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <form autoComplete="off">
            <TextField
              margin="dense"
              id="alias"
              autoFocus
              onChange={({ target }) => inputOnChange(target.id, target.value)}
              label="Slotnamn"
              value={formValues.alias}
              type="text"
              fullWidth
            />
          </form>
        </Grid>
        <Grid item xs={4}>
          <form autoComplete="off">
            <TextField
              margin="dense"
              id="capacity"
              onChange={({ target }) =>
                inputOnChange(target.id, Number(target.value))
              }
              label="Kapacitet"
              value={formValues.capacity}
              type="number"
              fullWidth
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={svLocale}>
            <KeyboardDatePicker
              margin="normal"
              id="fromDate"
              className={classes.dateInput}
              autoOk
              label="Från datum"
              format="dd/MM/yyyy"
              value={formValues.fromDate}
              onChange={date => inputOnChange("fromDate", date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="toDate"
              className={classes.dateInput}
              autoOk
              label="Till datum"
              format="dd/MM/yyyy"
              value={formValues.toDate}
              onChange={date => inputOnChange("toDate", date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </div>
  );
};

SlotForm.propTypes = {
  selectedSlot: PropTypes.object,
  setFormData: PropTypes.func
};

export default SlotForm;
