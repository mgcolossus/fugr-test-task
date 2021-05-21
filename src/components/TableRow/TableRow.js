import React from "react";

function TableRow({ rowData, tableColumnNames, onRowClick }) {
  return (
    <tr onClick={onRowClick ? () => onRowClick(rowData.id) : null}>
      {tableColumnNames.map((columnName, index) => {
        return <td key={index}>{rowData[columnName]}</td>;
      })}
    </tr>
  );
}

export default TableRow;
