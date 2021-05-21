import React, { useRef } from "react";
import styles from "./TableFilter.module.css"

function TableFilter({onFilter}) {
  const filterInputRef = useRef();
  return (
    <div className={styles.tableFilterWrapper}>
      <div>
        <input className={styles.tableFilterInput} ref={filterInputRef} placeholder="Введите подстроку" />
      </div>
      <div>
        <button className={styles.tableFilterButton} onClick={() => onFilter(filterInputRef.current.value)}>Найти</button>
      </div>
    </div>
  );
}

export default TableFilter;
