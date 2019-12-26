import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const DataTable = props => {
  const { tableData = [], deleteReservation = () => {} } = props;

  const renderRowCell = cellData => {
    const data = Object.values(cellData);
    const itemToReturn = data.map((item, index) => <td key={index}>{item}</td>);
    return itemToReturn;
  };

  const renderRowHeading = cellData => {
    const data = Object.keys(cellData);
    const itemToReturn = data.map((item, index) => <th key={index}>{item}</th>);
    return itemToReturn;
  };

  return (
    <Container>
      <Table responsive hover>
        <thead>
          <tr>
            {renderRowHeading(tableData[0])}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              {renderRowCell(data)}
              <td>
                <button
                  onClick={() =>
                    deleteReservation({
                      variables: { selectedItem: Number(data.id) }
                    })
                  }
                >
                  Ta bort bokning
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

DataTable.propTypes = {
  deleteReservation: PropTypes.func,
  setItem: PropTypes.func,
  tableData: PropTypes.array
};

export default DataTable;
