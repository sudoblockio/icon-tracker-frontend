import React, { useState, useEffect } from 'react'
import styles from './CustomButton.module.css'

export default function CustomButton({ label, handleAccept, handleReject }) {
    function handleClickOnAccept(evt) {
        console.log('Accept button clicked')
        handleAccept()
    }

    function handleClickOnReject(evt) {
        console.log('Reject button clicked')
        handleReject()
    }

    return (
        <div className={styles.customButtonContainer}>
            <button className={styles.acceptButton} onClick={handleClickOnAccept}>
                Approve
            </button>
            <button className={styles.rejectButton} onClick={handleClickOnReject}>
                Reject
            </button>
            <button className={styles.voteButton}>{label}</button>
        </div>
    )
}
