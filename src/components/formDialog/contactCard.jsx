import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

const ContactCard = ({ contact = {} }) => {
  const classes = useStyles();
  const { firstName, lastName, phoneNumber, email } = contact;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Telefon:</b> {phoneNumber}
          </p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Redigera kundinformation
        </Button>
      </CardActions>
    </Card>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object
};

export default ContactCard;
