import React, { useState, useEffect } from "react";
import styles from "./CustomButton.module.css";

<<<<<<< HEAD
export default function CustomButton({ handleAccept, handleReject }) {

=======
export default function CustomButton({
  label,
  handleAccept,
  handleReject
}) {
>>>>>>> fidelve/dev
  function handleClickOnAccept(evt) {
    console.log("Accept button clicked");
    handleAccept();
  }

  function handleClickOnReject(evt) {
    console.log("Reject button clicked");
    handleReject();
  }

  return (
<<<<<<< HEAD
    <div
      className={styles.customButtonContainer}
    >
      <button 
        className={styles.acceptButton}
        onClick={handleClickOnAccept}
      >Approve
      </button>
      <button 
        className={styles.rejectButton}
        onClick={handleClickOnReject}
      >Reject
      </button>
      <button 
        className={styles.voteButton}
      >Cast Vote
      </button>
=======
    <div className={styles.customButtonContainer}>
      <button className={styles.acceptButton} onClick={handleClickOnAccept}>
        Approve
      </button>
      <button className={styles.rejectButton} onClick={handleClickOnReject}>
        Reject
      </button>
      <button className={styles.voteButton}>{label}</button>
>>>>>>> fidelve/dev
    </div>
  );
}
