import React from "react";
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container';

const DataTable = props => {
  const { tableData = [], deleteReservationById = () => {} } = props;

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
      {tableData.length ? (
        <table>
          <thead>
            <tr>
              {renderRowHeading(tableData[0])}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length &&
              tableData.map((data, index) => (
                <tr key={index}>
                  {renderRowCell(data)}
                  <td>
                    <button
                      onClick={() =>
                        deleteReservationById({
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
        </table>
      ): <p>No table data</p>}
    </Container>
  );
};

DataTable.propTypes = {
  deleteReservation: PropTypes.func,
  setItem: PropTypes.func,
  tableData: PropTypes.array
};

export default DataTable;
