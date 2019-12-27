import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import "./notify-bar.scss";

const NotifyBar = ({ selectedDate = {}, handleClickOpen = () => {} }) => (
  <div className="notify-bar">
    <Container>
      {Object.keys(selectedDate).length ? (
        <p>{`From date ${selectedDate.startStr} to date ${selectedDate.endStr}`}</p>
      ) : (
        <p>{`Lägg till ett nytt event i kalendern`}</p>
      )}
      <button onClick={handleClickOpen}>Lägg till event</button>
    </Container>
  </div>
);

NotifyBar.propTypes = {
  shouldBeVisible: PropTypes.bool
};

export default NotifyBar;
