import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { LoadingWrapper } from "../shared";

const CustomerTable = ({
  classes = {},
  customerData = [],
  shouldRenderEvents = false
}) => {
  return (
    <LoadingWrapper isActive={!shouldRenderEvents}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <b>Förnamn</b>
              </TableCell>
              <TableCell align="left">
                <b>Efternamn</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Telefonnummer</b>
              </TableCell>
              <TableCell align="center">
                <b>Antal genomförda bokningar</b>
              </TableCell>
              <TableCell align="right">
                <b>Åtgärd för kundkontakt</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left"><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.reservations.length}</TableCell>
                <TableCell align="right">
                  <Button color="primary">Redigera</Button>{" / "}
                  <Button color="secondary">Ta bort</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LoadingWrapper>
  );
};

export default CustomerTable;
