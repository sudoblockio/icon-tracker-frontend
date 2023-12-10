import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ButtonSet.module.css'

const CONTRACT_EXPLORER_ROUTE = '/contracts/tool'
function ButtonSet({
    activeButton,
    handleActiveChange,
    showExpand = false,
    contract = '',
    handleShowExpand = null,
}) {
    const route =
        contract === ''
            ? `${CONTRACT_EXPLORER_ROUTE}`
            : `${CONTRACT_EXPLORER_ROUTE}?address=${contract}`
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

    const clickExpand = () => {
        console.log('click on expand')
        console.log(route)
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
            {showExpand && (
                <div className={`${styles.expand}`} onClick={clickExpand}>
                    <Link to={route}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="48"
                            width="48"
                            viewBox="0 -960 960 960"
                            fill="#299fac">
                            <path d="M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ButtonSet
