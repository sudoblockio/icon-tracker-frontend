import React, { useState } from "react";
import styles from "./prepUpdateModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import {
  chainMethods
} from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";

// Constants
const {
  setPrep
} = chainMethods;

const initPrepDetailsForm = {
  name: "",
  email: "",
  country: "",
  city: "",
  website: "",
  details: "",
  nodeAddress: ""
};

// this NID is hardcoded to lisbon testnet until a way to fix the nid
// depending on the network is developed
const HARDCODED_NID_FIX_THIS = 2;

const {
  parsePrepFormInputs,
  samples
} = utils;

const { 
  SET_PREP_SAMPLE: SETPREP
} = samples;

export default function PrepModal({ prepInfo, isOpen, onClose }) {
  const [prepDetailsForm, setPrepDetailsForm] = useState(initPrepDetailsForm);

  const nid = HARDCODED_NID_FIX_THIS;

  function handlePrepFormSubmit() {
    handleFormSubmit("prep");
  }

  async function handleFormSubmit(type) {
    let inputData = null;
    let txData = null;

    switch (type) {
      case "prep":
        inputData = parsePrepFormInputs(prepDetailsForm);
        console.log('inputData');
        console.log(inputData);

        if (inputData == null) {
        } else {
          txData = setPrep(prepInfo.address, inputData, nid);
          console.log('txData');
          console.log(txData);
        }
        break;
      default:
        break;
    }

    // dispatch event to wallet
    if (txData == null) {
      alert("Data for transaction is invalid");
    } else {
      // TODO:
      const walletResponse = await requestJsonRpc(txData.params);
      console.log('wallet response');
      console.log(walletResponse);

    }
  }

  function handlePrepFormInputChange(evnt) {
    const { value, name } = evnt.target;

    setPrepDetailsForm(prepFormState => {
      const newState = { ...prepFormState };
      newState[name] = value;

      return newState;
    });
  }

  return (
    <div>
      {prepInfo != null ? (
        <GenericModal
          isOpen={isOpen}
          onClose={onClose}
          useSmall={true}
        >
          <div>
            <div className={styles.main}>
              <div className={styles.defaultSection}>
              </div>
              <div className={styles.defaultSection}>
                <h2>Update Prep on-chain data:</h2>
                <p>
                  <a
                    href="https://docs.icon.community/icon-stack/client-apis/json-rpc-api/v3#setprep"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prep on-chain data
                  </a>{" "}
                  can be updated according to the following format:
                </p>
                <div className={styles.codeBlockContainer2}>
                  <pre className={styles.codeBlockPre}>{SETPREP}</pre>
                </div>
                <p>
                  Use the following form to update your Prep data, a transaction
                  will be signed with your node address using your preferred wallet,
                  you can see the details of the transaction before submitting it in
                  the wallet popup window.
                </p>
                <div className={styles.setPrepForm}>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      alignSelf: "center"
                    }}
                  >
                    <div className={styles.table}>
                      {[
                        [
                          "name",
                          prepInfo.name,
                          "Name:",
                          prepDetailsForm.name
                        ],
                        [
                          "email", 
                          prepInfo.email, 
                          "Email:", 
                          prepDetailsForm.email
                        ],
                        ["country",
                          prepInfo.country,
                          "Country:",
                          prepDetailsForm.country
                        ],
                        ["city",
                          prepInfo.city,
                          "City:",
                          prepDetailsForm.city
                        ],
                        ["website",
                          prepInfo.website,
                          "Website:",
                          prepDetailsForm.website
                        ],
                        ["details",
                          prepInfo.details,
                          "Details:",
                          prepDetailsForm.details
                        ],
                        ["nodeAddress",
                          prepInfo.node_address,
                          "nodeAddress:",
                          prepDetailsForm.nodeAddress
                        ]
                      ].map((arrItem, index) => {
                        return (
                          <div
                            key={`prep-item-${index}`}
                            className={styles.tableRow}
                          >
                            <p className={styles.tableRowLabel}>
                              <b>{arrItem[2]}</b>
                            </p>
                            <input
                              type="text"
                              placeholder={arrItem[1]}
                              name={arrItem[0]}
                              value={arrItem[3]}
                              onChange={handlePrepFormInputChange}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className={styles.button}
                      onClick={handlePrepFormSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GenericModal>
      ) : (
        <></>
      )
      }
    </div>
  );
}
