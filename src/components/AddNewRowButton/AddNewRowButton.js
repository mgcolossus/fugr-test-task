import React from 'react'
import styles from "./AddNewRowButton.module.css"

function AddNewRowButton({text, onButtonClick}) {
  return (
    <>
      <button className={styles.addNewRowButton} onClick={onButtonClick}>{text}</button>
    </>
  )
}

export default AddNewRowButton
