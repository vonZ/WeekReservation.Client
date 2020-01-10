import React from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
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
  },
  {
    linkName: "Reservationer",
    link: "/reservations"
  }
];

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  link: {
    textDecoration: "none",
    color: "black",
  }
});

const Navigation = ({ toggleNavigation, navigationIsOpen }) => {
  const classes = useStyles();

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleNavigation(false)}
      onKeyDown={toggleNavigation(false)}
    >
      <List>
        {linkList.map(({ linkName, link }) => (
          <Link className={classes.link} key={linkName} to={link}>
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
    <Drawer open={navigationIsOpen} onClose={toggleNavigation(false)}>
      {sideList()}
    </Drawer>
  );
};

export default Navigation;
