import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { tableData } from "./stores";
import styles from "./App.module.css";
import Pagination from "./components/Pagination/Pagination.js";
import Table from "./components/Table/Table.js";
import LoadingCircle from "./components/LoadingCircle/LoadingCircle";
import TableFilter from "./components/TableFilter/TableFilter";
import UserInfo from "./components/UserInfo/UserInfo";
import SelectDataDialog from "./components/SelectDataDialog/SelectDataDialog";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const onPageChange = (newPageNumber) => {
    tableData.setCurrentPage(newPageNumber);
  }

  const onFilter = (filterSubstring) => {
    tableData.filterTable(filterSubstring);
  };

  const sortTable = (columnName) => {
    tableData.changeSortParams(columnName);
  };

  const onRowClick = (id) => {
    tableData.changeSelectedUserId(id);
  };

  const loadSmallData = () => {
    setIsDialogOpen(false);
    tableData.loadSmallData();
  };

  const loadLargeData = () => {
    setIsDialogOpen(false);
    tableData.loadLargeData();
  };

  return (
    <>
      {isDialogOpen ? (
        <SelectDataDialog onSmallDataButtonClick={loadSmallData} onLargeDataButtonClick={loadLargeData} />
      ) : tableData.loading ? (
        <LoadingCircle />
      ) : (
        <div className={styles.appWrapper}>
          <TableFilter onFilter={onFilter} />
          <Pagination
            pagesCount={tableData.pagesCount}
            currentPage={tableData.currentPage}
            onPageChange={onPageChange}
          />
          <Table
            tableColumnTitleData={[
              { columnName: "id", columnTitleText: "ID" },
              { columnName: "firstName", columnTitleText: "firstName" },
              { columnName: "lastName", columnTitleText: "lastName" },
              { columnName: "email", columnTitleText: "email" },
              { columnName: "phone", columnTitleText: "phone" },
            ]}
            data={tableData.dataToShow}
            sortedColumnName={tableData.sortedColumnName}
            sortDirection={tableData.sortDirection}
            onColumnTitleClick={sortTable}
            onRowClick={onRowClick}
          />
          {tableData.selectedUser ? <UserInfo data={tableData.selectedUser} /> : null}
        </div>
      )}
    </>
  );
}

export default observer(App);
