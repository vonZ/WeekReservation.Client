import React, { useState } from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const linkList = [
  {
    linkName: "Start",
    link: "/"
  },
  {
    linkName: "Kalender",
    link: "/calendar"
  },
  {
    linkName: "Kunder",
    link: "/customers"
  }
];

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const Navigation = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    isOpen: false
  });

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, isOpen: open });
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {linkList.map(({ linkName, link }) => (
          <Link key={linkName} to={link}>
            <ListItem button key={linkName}>
              <ListItemText primary={linkName} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>Open Left</Button>
      <Drawer open={state.isOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </React.Fragment>
  );
};

export default Navigation;
