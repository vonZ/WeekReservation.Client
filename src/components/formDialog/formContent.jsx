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
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "@reach/router";

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

const FormContent = ({
  selectedDate,
  customers,
  setFormData = () => {}
}) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    ...selectedDate,
    nrOfGuests: selectedDate.nrOfGuests || 4,
    transportType: selectedDate.transportType || '',
    comment: selectedDate.comment || '',
    payedInAdvanced: selectedDate.payedInAdvanced || false,
    rentOveralls: selectedDate.rentOveralls || false
  });

  useEffect(() => {
    setFormData(formValues);
  }, [formValues, setFormData]);

  const setSelectedListValue = (list, typeId) =>
    list.find(item => Number(item.id) === formValues[typeId]);

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
            <Autocomplete
              id="customer"
              className={classes.textInput}
              defaultValue={setSelectedListValue(customers, "customerId")}
              options={customers}
              getOptionLabel={({ firstName, lastName, id }) =>
                `${firstName} ${lastName}`
              }
              autoSelect
              onChange={(event, value) =>
                inputOnChange("customerId", Number(value.id) || "")
              }
              renderInput={params => (
                <TextField {...params} label="Huvudbokare" fullWidth />
              )}
            />
            <Button size="small" variant="outlined" color="primary">
              <Link className={classes.link} to={"/customers"}>
                Lägg till ny kund
              </Link>
            </Button>
          </form>
        </Grid>
        <Grid item xs={4}>
          <form autoComplete="off">
            <TextField
              margin="dense"
              id="nrOfGuests"
              onChange={({ target }) =>
                inputOnChange(target.id, Number(target.value))
              }
              label="Totalt antal gäster"
              value={formValues.nrOfGuests}
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
        <Grid item xs={12}>
          <form autoComplete="off">
            <TextField
              margin="dense"
              id="transportType"
              onChange={({ target }) => inputOnChange(target.id, target.value)}
              label="Transportsätt"
              value={formValues.transportType}
              type="text"
              fullWidth
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="comment"
            margin="dense"
            label="Kommentar"
            variant="outlined"
            rows="4"
            value={formValues.comment}
            onChange={({ target }) => inputOnChange(target.id, target.value)}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Förbetalt</FormLabel>
            <RadioGroup
              aria-label="position"
              name="payedInAdvanced"
              onChange={({ target }) =>
                inputOnChange("payedInAdvanced", target.checked)
              }
              value={formValues.payedInAdvanced}
              row
            >
              <FormControlLabel
                value
                control={<Radio color="primary" />}
                label="Ja"
                labelPlacement="start"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="Nej"
                labelPlacement="start"
              />
            </RadioGroup>
            <FormLabel component="legend">Hyra overall</FormLabel>
            <RadioGroup
              aria-label="position"
              name="rentOveralls"
              onChange={({ target }) =>
                inputOnChange("rentOveralls", target.checked)
              }
              value={formValues.rentOveralls}
              row
            >
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Ja"
                labelPlacement="start"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="Nej"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

FormContent.propTypes = {
  customers: PropTypes.array,
  selectedDate: PropTypes.object,
  setFormData: PropTypes.func
};

export default FormContent;
