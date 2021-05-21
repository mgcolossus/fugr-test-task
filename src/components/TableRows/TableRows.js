import React from "react";
import TableRow from "../TableRow/TableRow";

function TableRows({ tableColumnNames, rowsData, onRowClick }) {
  return (
    <>
      {rowsData.map((AllRowData, index) => {
        const selectedData = {};
        for (let key of tableColumnNames) {
          if (AllRowData.hasOwnProperty(key)) {
            selectedData[key] = AllRowData[key];
          }
        }
        return <TableRow key={index} rowData={selectedData} tableColumnNames={tableColumnNames} onRowClick={onRowClick}/>;
      })}
    </>
  );
}

export default TableRows;
