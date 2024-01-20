import React, { useState, useEffect } from 'react'
import styles from './prepUpdateModal.module.css'
import GenericModal from '../GenericModal/genericModal'
import { chainMethods } from '../../utils/rawTxMaker'
import { requestJsonRpc } from '../../utils/connect'
import utils from '../../utils/utils2'
import config from '../../config'
import { getPRepRPC } from "../../redux/store/iiss";

const { nid } = config

// Constants
const { setPrep, setCommissionRate, initCommissionRate } = chainMethods

const initPrepDetailsForm = {
    name: '',
    email: '',
    country: '',
    city: '',
    website: '',
    details: '',
    nodeAddress: '',
}

const { parsePrepFormInputs, samples } = utils

const { SET_PREP_SAMPLE: SETPREP } = samples

export default function PrepModal({ prepInfo, isOpen, onClose }) {
    const [prepDetailsForm, setPrepDetailsForm] = useState(initPrepDetailsForm)
    const [prepRPCData, setPRepRPCData] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [commissionRateValues, setCommissionRateValues] = useState([]);
    const [walletResponse, setWalletResponse] = useState(null);

    function handlePrepFormSubmit() {
        handleFormSubmit('prep')
    }

    function handleCommissionRateSubmit() {
        handleFormSubmit("commissionRate");
    }

    async function handleFormSubmit(type) {
        let inputData = null
        let txData = null

        switch (type) {
            case 'prep':
                inputData = parsePrepFormInputs(prepDetailsForm)
                console.log('inputData')
                console.log(inputData)

                if (inputData == null) {
                } else {
                    txData = setPrep(prepInfo.address, inputData, nid)
                    console.log('txData')
                    console.log(txData)
                }
                break
            case "commissionRate":
                inputData = {};
                commissionRateValues.forEach(item => {
                    const num = Number(item[3]) * 100;
                    inputData[item[0]] = "0x" + num.toString(16);
                });
                if (inputData == null) {
                } else {
                    if (Object.keys(inputData).length > 1) {
                        txData = initCommissionRate(prepInfo.address, inputData, nid);
                    } else {
                        txData = setCommissionRate(prepInfo.address, inputData, nid);
                    }
                }
                break;
            default:
                break
        }

        // dispatch event to wallet
        if (txData == null) {
            alert('Data for transaction is invalid')
        } else {
            try {
                const response = await requestJsonRpc(txData.params);
                setWalletResponse(response);
            } catch (err) {
                console.log("error on requestJsonRpc");
                console.log(err);
            }
        }
    }

    function handlePrepFormInputChange(evnt) {
        const { value, name } = evnt.target

        setPrepDetailsForm((prepFormState) => {
            const newState = { ...prepFormState }
            newState[name] = value

            return newState
        })
    }

    function handleCommissionRateValues(valuesValidation, values) {
        setButtonDisabled(!valuesValidation.every(item => item === true));
        setCommissionRateValues(values);
    }

    async function getPRepRPCData() {
        if (
            prepInfo != null &&
            prepInfo.address != null &&
            typeof prepInfo.address == "string"
        ) {
            const prepRPC = await getPRepRPC(prepInfo.address);
            setPRepRPCData(prepRPC);
        }
    }
    
    useEffect(() => {
        getPRepRPCData();
    }, [prepInfo]);
    
    return (
        <div>
            {prepInfo != null ? (
                <GenericModal isOpen={isOpen} onClose={onClose} useSmall={true}>
                    <div>
                        <div className={styles.main}>
                            <div className={styles.defaultSection}>
                                <h2>Update Prep on-chain data:</h2>
                                <p></p>
                                <p>
                                    Use the following form to update your{' '}
                                    <a
                                        href="https://docs.icon.community/icon-stack/client-apis/json-rpc-api/v3#setprep"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Prep data
                                    </a>
                                    , a transaction will be signed with your node address using your
                                    preferred wallet, you can see the details of the transaction
                                    before submitting it in the wallet popup window.
                                </p>
                                <p>
                                    <span className={styles.bold}>Note:</span> you only need to
                                    define the fields that you want to change the rest wont be
                                    modified in the network.
                                </p>
                                <div className={styles.setPrepForm}>
                                    <div className={styles.table}>
                                        {[
                                            ['name', prepInfo.name, 'Name:', prepDetailsForm.name],
                                            [
                                                'email',
                                                prepInfo.email,
                                                'Email:',
                                                prepDetailsForm.email,
                                            ],
                                            [
                                                'country',
                                                prepInfo.country,
                                                'Country:',
                                                prepDetailsForm.country,
                                            ],
                                            ['city', prepInfo.city, 'City:', prepDetailsForm.city],
                                            [
                                                'website',
                                                prepInfo.website,
                                                'Website:',
                                                prepDetailsForm.website,
                                            ],
                                            [
                                                'details',
                                                prepInfo.details,
                                                'Details:',
                                                prepDetailsForm.details,
                                            ],
                                            [
                                                'nodeAddress',
                                                prepInfo.node_address,
                                                'nodeAddress:',
                                                prepDetailsForm.nodeAddress,
                                            ],
                                        ].map((arrItem, index) => {
                                            return (
                                                <div
                                                    key={`prep-item-${index}`}
                                                    className={styles.tableRow}>
                                                    <div className={styles.tableRowLabel}>
                                                        <p>{arrItem[2]}</p>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={styles.tableRowInput}
                                                        placeholder={arrItem[1]}
                                                        name={arrItem[0]}
                                                        value={arrItem[3]}
                                                        onChange={handlePrepFormInputChange}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <button className={styles.button} onClick={handlePrepFormSubmit}>
                                    Update
                                </button>
                                {prepRPCData != null ? (
                                    <div>
                                        <div
                                            style={{
                                                height: "2px",
                                                width: "100%",
                                                backgroundColor: "#d6d3d1",
                                                marginTop: "20px",
                                                marginBottom: "20px"
                                            }}
                                        ></div>
                                        {prepRPCData.commissionRate != null &&
                                                prepRPCData.maxCommissionChangeRate != null &&
                                                prepRPCData.maxCommissionRate != null ? (
                                                    <div className={styles.defaultSection}>
                                                        <CommissionRateComponent
                                                            title="setCommissionRate"
                                                            paragraph="This command will allow you to modify the commission rate for your Validator."
                                                            formItems={[["rate","0.1","Rate",""]]}
                                                            handleValues={handleCommissionRateValues}
                                                        />
                                                        <button
                                                            className={buttonDisabled ? `${styles.button} ${styles.buttonDisabled}` : `${styles.button}`}
                                                            onClick={handleCommissionRateSubmit}
                                                            disabled={buttonDisabled}
                                                        >Update</button>
                                                    </div>
                                                ) : (
                                                    <div className={styles.defaultSection}>
                                                        <CommissionRateComponent
                                                            title="initCommissionRate"
                                                            paragraph="This is a one time transaction to set the maximum commission rate and maximum commission rate change. You will not be able to change these parameters later. However, you will be able to change the commission rate later."
                                                            formItems={[
                                                                ["rate","0.1","Rate:",""],
                                                                ["maxRate","0.1","Max Commission Rate:",""],
                                                                ["maxChangeRate","0.1","Max Commission Rate Change:",""]]}
                                                            handleValues={handleCommissionRateValues}
                                                        />
                                                        <button
                                                            className={buttonDisabled ? `${styles.button} ${styles.buttonDisabled}` : `${styles.button}`}
                                                            onClick={handleCommissionRateSubmit}
                                                            disabled={buttonDisabled}
                                                        >Update</button>
                                                    </div>
                                                )}
                                        {walletResponse != null ? (
                                            <div className={styles.txResult}>
                                                <p>Transaction Result:</p>
                                                <p>{JSON.stringify(walletResponse)}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </GenericModal>
            ) : (
                <></>
            )}
        </div>
    )
}

function CommissionRateComponent({
  title,
  paragraph,
  formItems,
  handleValues
}) {
  const [formItemsState, setFormItemsState] = useState(formItems);
  const [valuesValidation, setValuesValidation] = useState(
    Array(formItems.length).fill(false)
  );
  function handleChange(evnt, index) {
    const { value, name } = evnt.target;
    const parsedValue = parseInt(value * 100);
    if (
      !Number.isNaN(parsedValue) &&
      parsedValue >= 1 &&
      parsedValue <= 10000
    ) {
      setValuesValidation(valuesValidation => {
        const value2 = Number(value).toFixed(2);
        const result = Number(value) - Number(value2) > 0 ? false : true;
        const newState = [...valuesValidation];
        newState[index] = result;

        return newState;
      });
    } else {
      setValuesValidation(valuesValidation => {
        const newState = [...valuesValidation];
        newState[index] = false;

        return newState;
      });
    }
    setFormItemsState(formItemsState => {
      const newState = [...formItemsState];
      newState[index][3] = value;

      return newState;
    });
  }

  useEffect(() => {
    handleValues(valuesValidation, formItemsState);
  }, [valuesValidation, formItemsState]);

  return (
    <div className={styles.defaultSection}>
      <h2>{title}:</h2>
      <p>{paragraph}</p>
      <p>
        Please enter the values in percent, 0-100, with at most 2 significant
        figures (ie 0.01%).
      </p>
      {formItemsState.map((item, index) => (
        <div key={`commission-item-${index}`} className={styles.tableRow}>
          <div className={styles.tableRowLabel}>
            <p>{item[2]}</p>
          </div>
          <input
            type="text"
            className={
              valuesValidation[index]
                ? `${styles.tableRowInput2} ${styles.inputGreen}`
                : `${styles.tableRowInput2} ${styles.inputRed}`
            }
            placeholder={item[1]}
            name={item[0]}
            value={item[3]}
            onChange={evt => {
              handleChange(evt, index);
            }}
          />
        </div>
      ))}
      <p style={{ fontSize: "0.6rem" }}>
        smallest value 0.01 biggest value 100
      </p>
    </div>
  );
}

