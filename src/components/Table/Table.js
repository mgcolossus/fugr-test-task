import React, { useState } from "react";
import styles from "./Table.module.css";
import { tableData } from "../../stores";
import TableRows from "../TableRows/TableRows";
import AddNewRowButton from "../AddNewRowButton/AddNewRowButton";
import NewRow from "./../NewRow/NewRow";

function SortArrow({ state }) {
  try {
    switch (state) {
      case "none":
        return <span className={styles.sortArrow}>⥯</span>;
      case "asc":
        return <span className={styles.sortArrow}>▲</span>;
      case "desc":
        return <span className={styles.sortArrow}>▼</span>;
      default:
        throw Error(`Unexpected value of 'state' prop: ${state}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function Table({ tableColumnTitleData, onColumnTitleClick, data, sortedColumnName, sortDirection, onRowClick }) {
  const [isNewRowActive, setIsNewRowActive] = useState(false);
  const [newRowId, setNewRowId] = useState("");
  const [newRowFirstName, setNewRowFirstName] = useState("");
  const [newRowLastName, setNewRowLastName] = useState("");
  const [newRowEmail, setNewRowEmail] = useState("");
  const [newRowPhone, setNewRowPhone] = useState("");
  const [newRowErrors, setNewRowErrors] = useState({
    id: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const changeNewRowVisibility = () => {
    setIsNewRowActive((prev) => !prev);
  };

  const resetNewRowInputs = () => {
    setNewRowId("");
    setNewRowFirstName("");
    setNewRowLastName("");
    setNewRowEmail("");
    setNewRowPhone("");
    setNewRowErrors("");
  };

  const onRowSubmit = () => {
    const currentErrors = {
      id: false,
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    };
    const emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (newRowId.length === 0 || /[^0-9]/g.test(newRowId)) {
      currentErrors.id = true;
    }

    if (newRowFirstName.length === 0 || /[^a-zA-Z]/i.test(newRowFirstName)) {
      currentErrors.firstName = true;
    }

    if (newRowLastName.length === 0 || /[^a-zA-Z]/i.test(newRowLastName)) {
      currentErrors.lastName = true;
    }

    if (!emailRegExp.test(newRowEmail)) {
      currentErrors.email = true;
    }

    if (newRowPhone.length !== 13) {
      currentErrors.phone = true;
    }

    setNewRowErrors(currentErrors);

    for (let key in currentErrors) {
      if (currentErrors[key]) {
        return;
      }
    }

    tableData.addNewRow(Number(newRowId), newRowFirstName, newRowLastName, newRowEmail, newRowPhone);
    changeNewRowVisibility();
    resetNewRowInputs();
  };

  const onNewRowIdChange = (e) => {
    setNewRowId(e.target.value);
  };
  const onNewRowFirstNameChange = (e) => {
    setNewRowFirstName(e.target.value);
  };
  const onNewRowLastNameChange = (e) => {
    setNewRowLastName(e.target.value);
  };
  const onNewRowEmailChange = (e) => {
    setNewRowEmail(e.target.value);
  };
  const onNewRowPhoneChange = (e) => {
    let value = e.target.value;
    let mask = "(000)000-0000";
    let literalPattern = /[0]/;
    let numberPattern = /[0-9]/;

    let maskLength = mask.length;
    let valueIndex = 0;
    let maskIndex = 0;

    let newValue = "";

    for (; maskIndex < maskLength; ) {
      if (maskIndex >= value.length) break;

      if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

      // Found a literal
      while (mask[maskIndex].match(literalPattern) === null) {
        if (value[valueIndex] === mask[maskIndex]) break;
        newValue += mask[maskIndex++];
      }
      newValue += value[valueIndex++];
      maskIndex++;
    }

    setNewRowPhone(newValue);
  };

  const tableColumnNames = tableColumnTitleData.map((columnTitleData) => columnTitleData.columnName);
  return (
    <>
      <AddNewRowButton
        text={isNewRowActive ? "Добавить в таблицу" : "Добавить"}
        onButtonClick={isNewRowActive ? onRowSubmit : changeNewRowVisibility}
      />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableColumnTitleData.map((columnTitleData, index) => {
                return (
                  <th key={index} onClick={() => onColumnTitleClick(columnTitleData.columnName)}>
                    {columnTitleData.columnTitleText}
                    <SortArrow state={columnTitleData.columnName === sortedColumnName ? sortDirection : "none"} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isNewRowActive ? (
              <NewRow
                newRowId={newRowId}
                newRowFirstName={newRowFirstName}
                newRowLastName={newRowLastName}
                newRowEmail={newRowEmail}
                newRowPhone={newRowPhone}
                newRowErrors={newRowErrors}
                onNewRowIdChange={onNewRowIdChange}
                onNewRowFirstNameChange={onNewRowFirstNameChange}
                onNewRowLastNameChange={onNewRowLastNameChange}
                onNewRowEmailChange={onNewRowEmailChange}
                onNewRowPhoneChange={onNewRowPhoneChange}
              />
            ) : null}
            <TableRows tableColumnNames={tableColumnNames} rowsData={data} onRowClick={onRowClick} />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
