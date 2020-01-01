import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import svLocale from "date-fns/locale/sv";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  dateInput: {
    marginRight: theme.spacing(1)
  }
}));

const FormContent = ({
  selectedDate,
  customers = [],
  setFormData = () => {}
}) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState(selectedDate);
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
    <div className="form-content">
      <section className={classes.formControl}>
        <Autocomplete
          id="customer"
          options={customers}
          getOptionLabel={({ firstName, lastName, id }) =>
            `${firstName} ${lastName}`
          }
          autoSelect
          onChange={(event, value) =>
            inputOnChange("customerId", Number(value.id) || '')
          }
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="Besökare" fullWidth />
          )}
        />
      </section>
      <section className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={svLocale}>
          <KeyboardDatePicker
            margin="normal"
            id="fromDate"
            className={classes.dateInput}
            autoOk
            label="Från datum"
            format="dd/MM/yyyy"
            value={formValues.fromDate}
            onChange={date => inputOnChange("fromDate", date.toLocaleDateString())}
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
            onChange={date => inputOnChange("toDate", date.toLocaleDateString())}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </section>
      <section className={classes.formControl}>
        <TextField
          margin="dense"
          id="transportType"
          onChange={({ target }) => inputOnChange(target.id, target.value)}
          label="Transportsätt"
          type="text"
          fullWidth
        />
      </section>
      <section className={classes.formControl}>
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
      </section>
      <FormControl component="fieldset">
        <section className={classes.formControl}>
          <FormLabel component="legend">Förbetalt</FormLabel>
          <RadioGroup
            aria-label="position"
            name="payedInAdvanced"
            onChange={({ target }) =>
              !console.log(target.checked) &&
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
        </section>
        <section className={classes.formControl}>
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
        </section>
      </FormControl>
    </div>
  );
};

FormContent.propTypes = {
  selectedDate: PropTypes.object
};

export default FormContent;
