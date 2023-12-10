import React, { useState, useEffect } from 'react'
import { TransactionLink } from '../../../components'
import { is0xHash } from '../../../utils/utils'
import { getTransactionResultFromRPCNotSdk, getTxResultWaited } from '../../../redux/api/restV3/icx'
import styles from './MiscContractComponents.module.css'

function ReadMethodItems({
    methods,
    params,
    handleChange,
    handleClick,
    address,
    network,
    startIndex = 0,
    endpoint,
}) {
    return (
        <ul className="list">
            {methods.readOnlyMethodsNameArray.map((methodName, index) => {
                const isExpandable =
                    methods[methodName].inputs.readonly != null &&
                    methods[methodName].inputs.readonly === '0x1'
                        ? methods[methodName].inputs.inputs.length > 0
                            ? true
                            : methods[methodName].inputs.outputs.length < 1
                              ? false
                              : methods[methodName].inputs.outputs[0].type === 'dict' ||
                                  methods[methodName].inputs.outputs[0].type === 'list'
                                ? true
                                : false
                        : true
                return (
                    <div key={`MethodItem-${methodName}-${index}`}>
                        <CollapsableComponent
                            methodInput={methods[methodName].inputs}
                            methodName={methodName}
                            methodOutput={methods[methodName].outputs}
                            index={index}
                            params={params}
                            handleChangeParent={handleChange}
                            handleClick={handleClick}
                            address={address}
                            isExpandable={isExpandable}
                            startIndex={startIndex}
                            network={network}
                            endpoint={endpoint}
                        />
                    </div>
                )
            })}
        </ul>
    )
}

function WriteMethodItems({
    methods,
    params,
    handleChange,
    handleClick,
    address,
    network,
    startIndex = 0,
    showEvents = false,
    endpoint,
}) {
    return (
        <ul className="list">
            {methods.writeMethodsNameArray.map((methodName, index) => {
                return (
                    <div key={`MethodItem-${methodName}-${index}`}>
                        <CollapsableComponent
                            methodInput={methods[methodName].inputs}
                            methodName={methodName}
                            methodOutput={methods[methodName].outputs}
                            index={index}
                            params={params}
                            handleChangeParent={handleChange}
                            handleClick={handleClick}
                            address={address}
                            isExpandable={true}
                            alwaysShowButton={true}
                            startIndex={startIndex}
                            showEvents={showEvents}
                            network={network}
                            endpoint={endpoint}
                            isReadonly={false}
                        />
                    </div>
                )
            })}
        </ul>
    )
}

function CollapsableComponent({
    methodInput,
    methodName,
    methodOutput,
    index,
    params,
    handleChangeParent,
    handleClick,
    address,
    isExpandable,
    startIndex,
    network,
    alwaysShowButton = false,
    showEvents = false,
    isReadonly = true,
    endpoint = '',
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [resultIsOpen, setResultIsOpen] = useState(false)
    const [responseState, setResponseState] = useState('')
    const [eventlogState, setEventlogState] = useState('')
    const outputType =
        methodInput.readonly != null && methodInput.readonly === '0x1'
            ? methodInput.outputs.length < 1
                ? ''
                : methodInput.outputs[0].type
            : ''
    const parsedMethodOutput =
        methodInput.readonly != null && methodInput.readonly === '0x1'
            ? JSON.stringify(methodOutput.valueArray[0])
            : ''

    function handleEventlogChange(txHash) {
        //
    }

    function toggleOpen() {
        setIsOpen((state) => !state)
    }

    function handleButtonClick() {
        handleClick(address, methodName, methodInput.inputs, index, network, endpoint)
        setResultIsOpen(true)
    }

    function parseResponse(response) {
        if (response.error === '') {
            const parsedResponse = isReadonly
                ? JSON.stringify(response.valueArray)
                : response.valueArray[0]
            return parsedResponse
        } else {
            return response.error
        }
    }

    useEffect(() => {
        if (!isOpen) {
            setResultIsOpen(false)
        } else {
            if (methodInput.inputs.length === 0) {
                setResultIsOpen(true)
            }
        }
    }, [isOpen, methodInput.inputs])

    useEffect(() => {
        async function getLogFromTx() {
            const response = await getTxResultWaited(methodOutput.valueArray[0], network)
            let parsedEventlog = ''

            if (response.error !== '') {
                parsedEventlog = JSON.stringify(response.error)
            } else {
                parsedEventlog = JSON.stringify(response.data.result.eventLogs)
            }
            setEventlogState(parsedEventlog)
        }
        const parsedResponse = parseResponse(methodOutput)
        setResponseState(parsedResponse)

        if (methodOutput.error === '') {
            if (is0xHash(methodOutput.valueArray[0])) {
                getLogFromTx()
            }
        }
    }, [methodOutput])

    return (
        <div
            className={
                !isExpandable
                    ? `${styles.writeMethodContainer} ${styles.writeMethodContainerClosed}`
                    : isOpen
                      ? `${styles.writeMethodContainer} ${styles.writeMethodContainerOpen}`
                      : `${styles.writeMethodContainer} ${styles.writeMethodContainerClosed}`
            }>
            <div
                className={
                    isExpandable
                        ? `${styles.writeMethodTitle} ${styles.writeMethodTitleExpandable}`
                        : `${styles.writeMethodTitle}`
                }
                onClick={toggleOpen}>
                <div className={styles.writeMethodTitleLeft}>
                    <span>{index + 1 + startIndex}.</span>
                    <span>{methodName}</span>{' '}
                    {!isExpandable && (
                        <span className={styles.writeMethodTitleLeftOutput}>
                            {parsedMethodOutput}
                        </span>
                    )}
                    <span>
                        <em>{outputType}</em>
                    </span>{' '}
                </div>
                {isExpandable && (
                    <div className={styles.writeMethodTitleRight}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={
                                !isOpen
                                    ? `${styles.writeMethodTitleIcon}`
                                    : `${styles.writeMethodTitleIcon} ${styles.writeMethodTitleIconRotated}`
                            }>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className={styles.writeMethodBodyOuterContainer}>
                <div className={styles.writeMethodBody}>
                    {methodInput.inputs.length > 0 &&
                        methodInput.inputs.map((input, index2) => {
                            const name = input['name']
                            const type = input['type']
                            const inputName = `${methodName}_${name}_${type}`
                            const placeholder = `${name} (${type})`
                            const value = params[inputName] || ''

                            return (
                                <div
                                    className={styles.writeMethodBodyInput}
                                    key={`writeMethod-element-${index2}`}>
                                    <div className={styles.writeMethodBodyInputName}>
                                        {placeholder}
                                    </div>
                                    <div className={styles.writeMethodBodyInputType}>
                                        <input
                                            type="text"
                                            key={`writeMethod-${index2}`}
                                            name={inputName}
                                            placeholder={placeholder}
                                            value={value}
                                            onChange={handleChangeParent}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    {(methodInput.inputs.length > 0 || alwaysShowButton) && (
                        <div className={styles.methodInputButtonContainer}>
                            <button
                                className={styles.methodInputButton}
                                onClick={handleButtonClick}>
                                Query
                            </button>
                        </div>
                    )}
                </div>
                {showEvents && (
                    <EventlogComponent value={eventlogState} onValueChange={handleEventlogChange} />
                )}
            </div>
            {resultIsOpen && methodOutput.state > 0 && (
                <div
                    className={
                        methodOutput.error === ''
                            ? `${styles.writeMethodBodyOutput} ${styles.writeMethodBodyOutputSuccess}`
                            : `${styles.writeMethodBodyOutput} ${styles.writeMethodBodyOutputError}`
                    }>
                    <p>Response:</p>
                    {isReadonly ? (
                        <p className={styles.writeMethodBodyOutputResponseContent}>
                            {responseState}
                        </p>
                    ) : methodOutput.error === '' ? (
                        <div>
                            <TransactionLink
                                to={responseState}
                                label={responseState}
                                onClick={() => console.log('click')}
                            />
                        </div>
                    ) : (
                        <p>{responseState}</p>
                    )}
                </div>
            )}
        </div>
    )
}

function EventlogComponent({ value, onValueChange }) {
    return (
        <div className={styles.eventlogMain}>
            <textarea
                className={styles.eventlogTextarea}
                placeholder="Event logs"
                value={value}
                onChange={onValueChange}
            />
        </div>
    )
}

const MiscComponents = {
    ReadMethodItems,
    WriteMethodItems,
}

export default MiscComponents
