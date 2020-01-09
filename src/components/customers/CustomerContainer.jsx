import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_CUSTOMERS } from "../../graphql";
import Container from "@material-ui/core/Container";
import CustomerTable from "./CustomerTable";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  section: {
    marginTop: 50
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  table: {
    minWidth: 650
  }
});

const CustomerContainer = props => {
  const {
    data: customerNodes,
    loading: customerDataIsLoading,
    error: getCustomerError
  } = useQuery(GET_ALL_CUSTOMERS);

  const classes = useStyles();
  const { getAllCustomers = [] } = customerNodes;

  const shouldRenderCustomer = () =>
    !customerDataIsLoading && !getCustomerError;

  const customerTableProps = {
    classes,
    customerData: getAllCustomers,
    shouldRenderEvents: shouldRenderCustomer()
  };

  return (
    <Container>
      <div className={classes.section}>
        <Button
          align="right"
          variant="contained"
          color="primary"
          disableElevation
        >
          Lägg till kund
        </Button>
        <div className={classes.tableContainer}>
          <CustomerTable {...customerTableProps} />
        </div>
      </div>
    </Container>
  );
};

export default CustomerContainer;
