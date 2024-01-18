import React, { useState } from 'react'
import styles from './ButtonSet.module.css'

function ButtonSet({ activeButton, handleActiveChange }) {
    const handleClick = (index) => {
        handleActiveChange(index)
    }

    const clickAll = () => {
        handleClick(0)
    }

    const clickRead = () => {
        handleClick(1)
    }

    const clickWrite = () => {
        handleClick(2)
    }

    return (
        <div className={styles.buttonSet}>
            <button
                className={`${styles.button} ${activeButton === 0 ? styles.activeButton : ''}`}
                onClick={clickAll}>
                All
            </button>
            <button
                className={`${styles.button} ${activeButton === 1 ? styles.activeButton : ''}`}
                onClick={clickRead}>
                Read Contract
            </button>
            <button
                className={`${styles.button} ${activeButton === 2 ? styles.activeButton : ''}`}
                onClick={clickWrite}>
                Write Contract
            </button>
        </div>
    )
}

export default ButtonSet
