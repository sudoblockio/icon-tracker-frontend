import React, { useState, useEffect } from 'react'
import styles from './customButtonSet.module.css'

const HEIGHT = 25
const WIDTH = 25

export default function CustomButtonSet({ handlePlus, handleMinus }) {
    return (
        <div className={styles.buttonSet}>
            <div className={styles.plusButton} onClick={handlePlus}>
                <svg
                    xmlns="http://wwww.w3.org/2000/svg"
                    height={HEIGHT}
                    width={WIDTH}
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className={styles.plusSvg}>
                    <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
                </svg>
            </div>
            <div className={styles.minusButton} onClick={handleMinus}>
                <svg
                    xmlns="http://wwww.w3.org/2000/svg"
                    height={HEIGHT}
                    width={WIDTH}
                    viewBox="0 -960 960 960"
                    className={styles.minusSvg}
                    fill="currentColor">
                    <path d="M200-450v-60h560v60H200Z" />
                </svg>
            </div>
        </div>
    )
}
