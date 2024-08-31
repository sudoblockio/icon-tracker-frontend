import React from 'react'
import styles from './GenericModal.module.css'

export default function GenericModalV2({ isOpen, onClose, useSmall = false, children, style = {}, allowOutsideClick = true }) {
    function handleOnClose() {
        if (!allowOutsideClick)
            onClose()
    }

    function onMainClick(event) {
        event.stopPropagation()
    }
    return (
        <div
            className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}
            onClick={handleOnClose}>
            <div
                style={style}
                className={
                    useSmall
                        ? `${styles.main} ${styles.mainSmall}`
                        : `${styles.main} ${styles.mainBig}`
                }
                onClick={onMainClick}>
                {children}
            </div>
        </div>
    )
}
