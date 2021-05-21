import React from "react";
import styles from "./SelectDataDialog.module.css";

function SelectDataDialog({ onSmallDataButtonClick, onLargeDataButtonClick }) {
  return (
    <div className={styles.selectDataDialogWrapper}>
      <div className={styles.selectDataDialogBody}>
        <h3 className={styles.selectDataDialogTitle}>Выберите объем данных для таблицы</h3>
        <div className={styles.selectDataDialogButtonWrapper}>
          <button className={styles.selectDataDialogButton} onClick={onSmallDataButtonClick}>
            Малый
          </button>
        </div>
        <div className={styles.selectDataDialogButtonWrapper}>
          <button className={styles.selectDataDialogButton} onClick={onLargeDataButtonClick}>
            Большой
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectDataDialog;
