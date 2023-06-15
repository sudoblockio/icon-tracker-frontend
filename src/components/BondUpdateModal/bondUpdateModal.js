import React, { useState, useEffect } from "react";
import styles from "./bondUpdateModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import { chainMethods } from "../../utils/rawTxMaker";
import { getBondList } from "../../redux/store/iiss";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

// Constants
const { setBonderList } = chainMethods;

const { parseBonderFormInputs } = utils;

export default function BondedModal({ address, isOpen, onClose }) {
  const [bondListState, setBondListState] = useState([]);

  // function handleFormInputChange(evnt) {
  //   const { value, name } = evnt.target;

  //   setBonderForm(bonderState => {
  //     let newState = { ...bonderState };
  //     newState[name] = value;

  //     return newState;
  //   });
  // }

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
    console.log("on handle address");
    const { value, name } = evt.target;
    setBondListState(prevState => {
      const newState = [...prevState];
      newState[index].address = value;
      return newState;
    });
  }

  function handleValueChange(index, evt) {
    console.log("on handle value");
    console.log("on handle address");
    const { value, name } = evt.target;
    setBondListState(prevState => {
      const newState = [...prevState];
      newState[index].value = value;
      return newState;
    });
  }
  useEffect(() => {
    async function getBondedData() {
      const payload = { address };
      const bondList = await getBondList(payload);
      console.log("bondList");
      console.log(bondList);
      const parsedBondList = bondList.map(bond => {
        return {
          address: bond.address,
          value: parseInt(bond.value) / 10 ** 18
        };
      });

      setBondListState(parsedBondList);
      // setBondListState(prevState => {
      //   const newState = {};
      //   bondList.map(bond => {
      //     newState[bond.address] = parseInt(bond.value) / 10 ** 18;
      //   });
      //   return {
      //     ...prevState,
      //     ...newState
      //   };
      // });
    }
    if (address != null) {
      getBondedData();
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
                  Description of this modal window and how to change the list of
                  preps that are bonded with this address
                </p>
                <div>
                  <p>Table of bonded preps:</p>
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
                            className={styles.input}
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
                            className={styles.input}
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
