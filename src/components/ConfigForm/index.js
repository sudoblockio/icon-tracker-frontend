import React from "react"
import styles from "./ConfigForm.module.scss"
import GenericModalV2 from "../GenericModalV2/GenericModal"
import { useConfigForm } from "./useConfigForm"

export default function ConfigForm({ isOpen, onClose, onSubmit }) {
    const { values, handleInputChange, handleSubmit } = useConfigForm();


    return (
        <GenericModalV2 isOpen={isOpen} onClose={onClose}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>API Configuration Form</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nid" className={styles.label}>NID:</label>
                        <input
                            type="text"
                            id="nid"
                            value={values.nid}
                            onChange={(e) => handleInputChange('nid', e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="apiEndpoint" className={styles.label}>API Endpoint:</label>
                        <input
                            type="text"
                            id="apiEndpoint"
                            value={values.apiEndpoint}
                            onChange={(e) => handleInputChange('apiEndpoint', e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="rpcEndpoint" className={styles.label}>RPC Endpoint:</label>
                        <input
                            type="text"
                            id="rpcEndpoint"
                            value={values.rpcEndpoint}
                            onChange={(e) => handleInputChange('rpcEndpoint', e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </GenericModalV2>

    )
};

