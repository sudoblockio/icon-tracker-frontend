import React, { useState, useEffect } from "react";
import styles from "./bondUpdateModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import CustomButtonSet from "./customButtonSet";
import { chainMethods } from "../../utils/rawTxMaker";
import { getBondList, getStake2, getDelegation } from "../../redux/store/iiss";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

// Constants
const { setBonderList } = chainMethods;

const { parseBonderFormInputs, isValidICONAddress } = utils;

export default function BondedModal({ address, isOpen, onClose }) {
  const [bondListState, setBondListState] = useState([]);
  const [maxAmountToBond, setMaxAmountToBond] = useState("0");

  async function handleFormSubmit() {
    // let inputData = null;
    // let txData = null;
    // switch (type) {
    //   case "bond":
    //     inputData = parseBonderFormInputs(bonderForm);
    //     if (inputData == null || inputData.length === 0) {
    //     } else {
    //       txData = setBonderList(address, inputData, nid);
    //     }
    //     break;
    //   default:
    //     break;
    // }
    // // dispatch event to wallet
    // if (txData == null) {
    //   alert("Data for transaction is invalid");
    // } else {
    //   const walletResponse = await requestJsonRpc(txData.params);
    //   console.log("wallet response");
    //   console.log(walletResponse);
    // }
  }

  function handleAddressChange(index, evt) {
    const { value, name } = evt.target;
    setBondListState(prevState => {
      const newState = [...prevState];
      newState[index].address = value;
      newState[index].addressIsValid = checkIfValidAddress(value);
      return newState;
    });
  }

  function handleValueChange(index, evt) {
    const { value, name } = evt.target;
    setBondListState(prevState => {
      const newState = [...prevState];
      newState[index].value = value;
      newState[index].valueIsValid = checkIfValidValue(value);
      return newState;
    });
  }

  function handleClickAddRow() {
    setBondListState(prevState => {
      const newState = [...prevState];
      newState.push({
        address: "",
        value: "",
        addressIsValid: false,
        valueIsValid: false
      });
      return newState;
    });
  }

  function handleClickRemoveRow() {
    setBondListState(prevState => {
      const newState = [...prevState];
      newState.pop();
      return newState;
    });
  }

  useEffect(() => {
    async function fetchInit() {
      const payload = { address };
      const bondList = await getBondList(payload);
      const stake = await getStake2(payload.address);
      const delegation = await getDelegation(payload);
      const maxAmountToBond = parseStakeVoteAndBond(
        stake,
        delegation,
        bondList
      );

      const parsedMaxAmountToBond =
        maxAmountToBond == null ? "null" : maxAmountToBond.toString();
      const parsedBondList = parseBondList(bondList);
      setMaxAmountToBond(maxAmountToBond);
      setBondListState(parsedBondList);
    }
    if (address != null) {
      fetchInit();
    }
  }, [address]);

  return (
    <div>
      {address != null ? (
        <GenericModal
          style={{ minWidth: "780px" }}
          isOpen={isOpen}
          onClose={onClose}
          useSmall={true}
        >
          <div>
            <div className={styles.main}>
              <div className={styles.defaultSection}>
                <h2>Bonded Info:</h2>
                <p>
                  Use the following form to update the bondlist related to your
                  wallet address.
                </p>
                <p>
                  The max amount shown below is the total staked ICX minus the
                  total delegated ICX in your wallet.
                </p>
                <p>Max amount available to bond: {maxAmountToBond} ICX</p>
                <div>
                  <p className={styles.tableTitle}>Table of bonded preps:</p>
                </div>
                <div className={styles.table}>
                  <div className={`${styles.tableRow} ${styles.tableHead}`}>
                    <div>
                      <p>Address</p>
                    </div>
                    <div>
                      <p>Amount</p>
                    </div>
                  </div>
                  {bondListState.map((address, index) => {
                    return (
                      <div key={index} className={styles.tableRow}>
                        <div>
                          <input
                            type="text"
                            name={address.address}
                            value={address.address}
                            className={
                              address.addressIsValid
                                ? `${styles.input} ${styles.inputValid}`
                                : `${styles.input} ${styles.inputInvalid}`
                            }
                            onChange={evt => {
                              handleAddressChange(index, evt);
                            }}
                            placeholder=""
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name={address.value}
                            value={address.value}
                            className={
                              address.valueIsValid
                                ? `${styles.input} ${styles.inputValid}`
                                : `${styles.input} ${styles.inputInvalid}`
                            }
                            onChange={evt => {
                              handleValueChange(index, evt);
                            }}
                            placeholder=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <CustomButtonSet
                  handlePlus={handleClickAddRow}
                  handleMinus={handleClickRemoveRow}
                />
                <button className={styles.button} onClick={handleFormSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </GenericModal>
      ) : (
        <></>
      )}
    </div>
  );
}

function checkIfValidAddress(address) {
  try {
    return isValidICONAddress(address);
  } catch (e) {
    console.log("Error validating address");
    return false;
  }
}

function checkIfValidValue(value) {
  return !isNaN(value);
}

function parseBondList(bondList) {
  const result = [];
  try {
    bondList.map(bond => {
      const parsed = {
        address: bond.address,
        value: parseInt(bond.value) / 10 ** 18,
        addressIsValid: checkIfValidAddress(bond.address),
        valueIsValid: checkIfValidValue(bond.value)
      };
      result.push(parsed);
    });
  } catch (e) {
    console.log("Error parsing bondlist");
  }

  return result;
}

function parseStakeVoteAndBond(stake, vote, bond) {
  try {
    console.log("on parse");
    console.log(stake);
    console.log(vote);
    console.log(bond);
    const parsedStake = parseInt(stake.stake) / 10 ** 18;
    const parsedVote = parseInt(vote.totalDelegated) / 10 ** 18;

    return parsedStake - parsedVote;
  } catch (e) {
    console.log("Error running parseStateVoteAndBond");
    return null;
  }
}
