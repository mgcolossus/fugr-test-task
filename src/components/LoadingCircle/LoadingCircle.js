import React from 'react'
import loadingCircleImg from "./loadingCircle.svg";
import styles from "./LoadingCircle.module.css"

function LoadingCircle() {
  return (
    <div className={styles.loadingCircle}>
      <img src={loadingCircleImg} alt="loading" />
    </div>
  )
}

export default LoadingCircle
