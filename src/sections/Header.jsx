import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Navigation from "../components/navigation/Navigation";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    navigationIsOpen: false
  });

  const toggleNavigation = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, navigationIsOpen: open });
  };

  const navigationProps = {
    toggleNavigation,
    navigationIsOpen: state.navigationIsOpen
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={toggleNavigation(true)} color="inherit">
            Meny
          </Button>
        </Toolbar>
      </AppBar>
      <Navigation {...navigationProps} />
    </div>
  );
};

export default Header;
