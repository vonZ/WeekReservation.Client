import React from "react";
import { LoadingWrapper } from "../shared";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const WeekRow = ({ classes, item, index }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      aria-controls="panel1a-content"
      id="panel1a-header"
      expandIcon={<ExpandMoreIcon color="disabled" />}
    >
      <div style={{ width: "100%" }}>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            <Typography>
              <b>{item.alias}</b>
            </Typography>
          </Box>
          <Box p={1} flexGrow={8}>
            <Typography>
              <small>{`${item.fromDate} till ${item.toDate}`}</small>
            </Typography>
          </Box>
          <Box p={1} flexGrow={2}>
            <Typography>
              <small>
                <u>Kapacitet:</u> { `${item.capacity} bokningar`}
              </small>
            </Typography>
          </Box>
          <Box p={1}>
            <Typography color="textSecondary">Beläggning</Typography>
          </Box>
          <Box p={1}>
            <FiberManualRecordRoundedIcon
              color={index % 3 ? "action" : "error"}
            />
          </Box>
        </Box>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails
      style={{ width: "100%", backgroundColor: "#f3f3f3" }}
    >
      <div style={{ width: "100%" }}>
        <Box p={1} display="flex">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Från</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Till</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Kommentar</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Transportsätt</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Kund</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Antal gäster</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Förbetalt</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Hyra overall</b>
                  </TableCell>
                  {/* <TableCell align="right"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell component="th" scope="row">
                    2019-03-01
                  </TableCell>
                  <TableCell align="left">2019-03-17</TableCell>
                  <TableCell align="left">Förbetalt med 20% rabatt</TableCell>
                  <TableCell align="center">Bil</TableCell>
                  <TableCell align="center">Viktor von Zeipel</TableCell>
                  <TableCell align="center">4</TableCell>
                  <TableCell align="center">Ja</TableCell>
                  <TableCell align="center">Nej</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell component="th" scope="row">
                    2019-03-01
                  </TableCell>
                  <TableCell align="left">2019-03-17</TableCell>
                  <TableCell align="left">Guidning på fredagen</TableCell>
                  <TableCell align="center">Bil</TableCell>
                  <TableCell align="center">James Bond</TableCell>
                  <TableCell align="center">8</TableCell>
                  <TableCell align="center">Nej</TableCell>
                  <TableCell align="center">Ja</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const ReservationTable = ({
  classes = {},
  slotData = [],
  shouldRenderEvents = false,
  mockWeekData = []
}) => {
  return (
    <LoadingWrapper isActive={!shouldRenderEvents}>
      {slotData.map((item, index) => (
        <WeekRow classes={classes} key={index} index={index} item={item} />
      ))}
    </LoadingWrapper>
  );
};

export default ReservationTable;
