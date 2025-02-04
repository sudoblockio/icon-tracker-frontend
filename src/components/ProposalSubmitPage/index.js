import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styles from './index.module.scss'
import { governanceMethods } from '../../utils/rawTxMaker'
import { requestJsonRpc } from '../../utils/connect'
import { icxSendTransaction } from '../../redux/api/jsProvider/icx'
import { addressInfo } from '../../redux/store/addresses'
import utils from './utils'
import config from '../../config'
import { fromUtf8 } from 'web3-utils'
import GenericModal from '../GenericModal/genericModal'
import { LoadingComponent } from '../../components'
import clsx from 'clsx'

// SET THE FOLLOWING FLAG TO true FOR TESTING
const USE_TESTING_PARAMS = false
const nid = USE_TESTING_PARAMS ? 3 : config.nid

const { typesOfProposals, proposalTypesData, stripString, getContentOfType } = utils

const { submitNetworkProposal } = governanceMethods

function ProposalSubmitPage(props) {
    const { walletAddress } = props

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [typeState, setTypeState] = useState('text')
    const [valueState, setValueState] = useState(getContentOfType('text'))
    const [titleState, setTitleValue] = useState('Proposal Title')
    const [descriptionState, setDescriptionState] = useState('Network Proposal description')
    const [valueIsValidJSON, setValueIsValidJSON] = useState(true)
    const [txResponse, setTxResponse] = useState(getTxResponseInitValues())
    const [walletIsPrep, setWalletIsPrep] = useState(false)

    function closeModal() {
        setModalIsOpen(false)
        const txResponseInitValues = getTxResponseInitValues()
        // txResponseInitValues.error.message = "";
        setTxResponse(txResponseInitValues)
    }

    function handleTextareaValueChange(newValueState) {
        setValueState(newValueState)
    }

    function handleTitleInputChange(evt) {
        setTitleValue(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescriptionState(evt.target.value)
    }

    function handleTypeChange(evt) {
        setTypeState(evt.target.value)
        setValueState(getContentOfType(evt.target.value))
    }

    async function handleSubmitClick() {
        if (!valueIsValidJSON) {
            alert('value is not valid json')
        } else if (walletIsPrep === false && USE_TESTING_PARAMS === false) {
            alert('Wallet is not logged or is not a validator')
        } else {
            setModalIsOpen(true)
            const p0 = JSON.parse(valueState)
            const p1 = [p0]
            const p2 = JSON.stringify(p1)
            const parsedValue = fromUtf8(p2)
            const rawTransaction = await submitNetworkProposal(
                walletAddress,
                {
                    title: titleState,
                    description: descriptionState,
                    value: parsedValue,
                },
                nid
            )
            const response = await icxSendTransaction({
                rawTx: rawTransaction,
                index: 0,
            })

            if (response.error.message === 'CANCEL_JSON-RPC') {
                closeModal()
            } else {
                setTxResponse(response)
            }
        }
    }

    useEffect(() => {
        let valueParsed
        try {
            valueParsed = JSON.parse(valueState)
            setValueIsValidJSON(true)
        } catch (e) {
            console.log('value cannot be parsed by JSON.parse')
            setValueIsValidJSON(false)
        }
    }, [valueState])

    useEffect(() => {
        async function getWalletInfo(wallet) {
            let walletInfo
            try {
                walletInfo = await addressInfo({
                    address: wallet,
                    limit: 10,
                    skip: 0,
                })

                setWalletIsPrep(walletInfo.data.is_prep)
            } catch (e) {
                walletInfo = null
            }

            if (walletInfo != null) {
            }
        }

        if (typeof walletAddress === 'string' && walletAddress !== '') {
            getWalletInfo(walletAddress)
        }
    }, [])

    return (
        <div className={styles.main}>
            {modalIsOpen && (
                <ResponseModal isOpen={modalIsOpen} onClose={closeModal} response={txResponse} />
            )}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>Create Proposal</h2>
                </div>


                <div className={styles.container}>
                    <div className={styles.tableRow}>
                        <div className={styles.titleContainer}>
                            <p className={styles.tableRowTitle}>Title</p>
                        </div>
                        <div className={styles.valueContainer}>
                            <input
                                type="text"
                                name={'name'}
                                value={titleState}
                                onChange={handleTitleInputChange}
                                placeholder={''}
                                className={styles.tableRowInput}
                            />
                        </div>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.titleContainer}>
                            <p className={styles.tableRowTitle}>Description</p>
                        </div>
                        <div className={styles.valueContainer}>
                            <textarea
                                type="text"
                                name={'name'}
                                value={descriptionState}
                                onChange={handleDescriptionChange}
                                placeholder={''}
                                className={styles.tableRowTextarea}
                            />
                        </div>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.titleContainer}>
                            <p className={styles.tableRowTitle}>Type</p>
                        </div>
                        <div className={styles.valueContainer}>
                            <DropdownItem value={typeState} onSelectChange={handleTypeChange} />
                        </div>
                    </div>
                    <div className={clsx(styles.tableRow, styles.valueRow)}>
                        <div className={styles.titleContainer}>
                            <p className={styles.tableRowTitle}>Value</p>
                        </div>
                        <div className={styles.valueContainer}>
                            <TextAreaValueItem
                                value={valueState}
                                onChange={handleTextareaValueChange}
                                borderStyle={valueIsValidJSON ? 'green' : 'red'}
                            />
                        </div>
                    </div>

                    <div className={clsx(styles.tableRow, styles.valueRow)}>
                        <div className={styles.titleContainer}>
                        </div>
                        <div className={styles.containerButton}>
                            <button className={styles.submitButton} onClick={handleSubmitClick}>
                                Submit
                            </button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

function TextAreaValueItem({ value, onChange, borderStyle = null }) {
    const classname =
        borderStyle == null
            ? styles.tableRowTextarea
            : borderStyle === 'green'
                ? `${styles.tableRowTextarea} ${styles.tableRowTextareaValid}`
                : `${styles.tableRowTextarea} ${styles.tableRowTextareaInvalid}`
    function handleChange(evt) {
        onChange(evt.target.value)
    }

    return (
        <textarea
            type="text"
            name={'textAreaValueItem'}
            value={value}
            onChange={handleChange}
            placeholder={''}
            className={classname}
        />
    )
}

function DropdownItem({ value, onSelectChange }) {
    return (
        <div className={styles.dropdownItem}>
            <div className={styles.dropdownItemContent}>
                <select
                    className={styles.dropdownItemSelect}
                    onChange={onSelectChange}
                    value={value || 'text'}>
                    {typesOfProposals.map((type, index) => {
                        return (
                            <option key={`${type}-${index}`} value={type}>
                                {type}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

function ResponseModal({ isOpen, onClose, response }) {
    const errorResponse = response.error != null ? response.error.message : ''
    const loading = (errorResponse == null || errorResponse === '') && response.data == null

    const successResponse = response.data != null ? response.data.result : null
    const route = typeof successResponse === 'string' ? `/transaction/${successResponse}` : '/404'
    return (
        <GenericModal isOpen={true} onClose={onClose} useSmall={true}>
            {loading ? (
                <div>
                    <LoadingComponent height={'300px'} />
                </div>
            ) : errorResponse === '' ? (
                <div>
                    <p>Transaction result:</p>
                    <Link to={route}>
                        <p>{successResponse}</p>
                    </Link>
                </div>
            ) : (
                <div>
                    <p>Error Response:</p>
                    <p>{errorResponse}</p>
                </div>
            )}
        </GenericModal>
    )
}

function getTxResponseInitValues() {
    const result = {
        status: 200,
        data: null,
        index: 0,
        error: { message: '' },
    }

    const stringified = JSON.stringify(result)
    return JSON.parse(stringified)
}

export default withRouter(ProposalSubmitPage)
