import React, { useState, useEffect } from "react";
import styles from "./ApplyButton.module.css";

export default function ApplyButton({ label, handleClick }) {
  function handleClickOnButton(evt) {
    console.log("button clicked");
    handleClick();
  }

  return (
    <div className={styles.applyButtonContainer}>
      <button className={styles.applyButton} onClick={handleClickOnButton}>
        {label}
      </button>
    </div>
  );
}
