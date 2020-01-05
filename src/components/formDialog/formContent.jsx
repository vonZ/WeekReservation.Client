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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textInput: {
    marginTop: 5,
    marginBottom: 4
  },
  dateInput: {
    marginRight: 10,
  }
}));

const FormContent = ({
  selectedDate,
  customers,
  roomTypes,
  setFormData = () => {}
}) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState(selectedDate);

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
          <Button
            size="small"
            color="primary"
          >
            Lägg till ny kund
          </Button>
        </Grid>
        <Grid item xs={4}>
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
          <TextField
            margin="dense"
            id="transportType"
            onChange={({ target }) => inputOnChange(target.id, target.value)}
            label="Transportsätt"
            value={formValues.transportType}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="roomType"
            defaultValue={setSelectedListValue(roomTypes, "roomType")}
            options={roomTypes}
            getOptionLabel={({ name, roomType, roomTypesAvailable }) =>
              `${name} - ${roomType} (${roomTypesAvailable} st totalt)`
            }
            autoSelect
            onChange={(event, value) =>
              inputOnChange("roomType", Number(value.id) || "")
            }
            renderInput={params => (
              <TextField {...params} label="Rumstyp" fullWidth />
            )}
          />
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
  roomTypes: PropTypes.any,
  selectedDate: PropTypes.object,
  setFormData: PropTypes.func
};

export default FormContent;
