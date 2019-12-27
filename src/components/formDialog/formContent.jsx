import React, { useState } from "react";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
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
import svLocale from "date-fns/locale/sv";

const FormContent = ({
  selectedDate: { startStr = Date.now(), endStr = Date.now() }
}) => {
  const [startDate, setStartDate] = useState(new Date(startStr));
  const [endDate, setEndDate] = useState(new Date(endStr));
  const [prepaid, setPrepaid] = React.useState("");
  const [rentOverall, setRentOverall] = React.useState("");

  return (
    <div className="form-content">
      <section className="input-section">
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="Förnamn"
          type="text"
          fullWidth
        />
      </section>
      <section className="input-section">
        <TextField
          margin="dense"
          id="lastname"
          label="Efternamn"
          type="text"
          fullWidth
        />
      </section>
      <section className="input-section">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={svLocale}>
          <KeyboardDatePicker
            margin="normal"
            id="from-date"
            autoOk
            disablePast
            label="Från datum"
            format="dd/MM/yyyy"
            value={startDate}
            onChange={date => setStartDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="to-date"
            autoOk
            disablePast
            label="Till datum"
            format="dd/MM/yyyy"
            value={endDate}
            onChange={date => setEndDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </section>
      <section className="input-section">
        <TextField
          margin="dense"
          id="comment"
          label="Kommentar"
          type="text"
          fullWidth
        />
      </section>
      <section className="input-section">
        <TextField
          margin="dense"
          id="transportType"
          label="Transportsätt"
          type="text"
          fullWidth
        />
      </section>
      <FormControl component="fieldset">
        <section className="input-section">
          <FormLabel component="legend">Förbetalt</FormLabel>
          <RadioGroup
            aria-label="position"
            name="payedInAdvanced"
            value={prepaid}
            onChange={event => setPrepaid(event.target.value)}
            row
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Ja"
              labelPlacement="start"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="Nej"
              labelPlacement="start"
            />
          </RadioGroup>
        </section>
        <section className="input-section">
          <FormLabel component="legend">Hyra overall</FormLabel>
          <RadioGroup
            aria-label="position"
            name="rentOveralls"
            value={rentOverall}
            onChange={event => setRentOverall(event.target.value)}
            row
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Ja"
              labelPlacement="start"
            />
            <FormControlLabel
              value="false"
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
