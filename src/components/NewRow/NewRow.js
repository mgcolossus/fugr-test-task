import React from "react";
import classNames from "classnames";
import styles from "./NewRow.module.css";

function NewRow({
  newRowId,
  newRowFirstName,
  newRowLastName,
  newRowEmail,
  newRowPhone,
  newRowErrors,
  onNewRowIdChange,
  onNewRowFirstNameChange,
  onNewRowLastNameChange,
  onNewRowEmailChange,
  onNewRowPhoneChange,
}) {
  return (
    <>
      <tr>
        <td>
          <input
            className={classNames(styles.newRowInput, { [styles.newRowInputError]: newRowErrors.id })}
            value={newRowId}
            onChange={onNewRowIdChange}
            type="text"
          />
        </td>
        <td>
          <input
            className={classNames(styles.newRowInput, { [styles.newRowInputError]: newRowErrors.firstName })}
            value={newRowFirstName}
            onChange={onNewRowFirstNameChange}
            type="text"
          />
        </td>
        <td>
          <input
            className={classNames(styles.newRowInput, { [styles.newRowInputError]: newRowErrors.lastName })}
            value={newRowLastName}
            onChange={onNewRowLastNameChange}
            type="text"
          />
        </td>
        <td>
          <input
            className={classNames(styles.newRowInput, { [styles.newRowInputError]: newRowErrors.email })}
            value={newRowEmail}
            onChange={onNewRowEmailChange}
            type="text"
          />
        </td>
        <td>
          <input
            className={classNames(styles.newRowInput, { [styles.newRowInputError]: newRowErrors.phone })}
            value={newRowPhone}
            onChange={onNewRowPhoneChange}
            type="text"
          />
        </td>
      </tr>
    </>
  );
}

export default NewRow;
