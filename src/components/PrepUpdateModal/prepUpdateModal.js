import React, { useState } from "react";
import styles from "./prepUpdateModal.module.css";
import GenericModal from "../GenericModal/genericModal";
import { chainMethods } from "../../utils/rawTxMaker";
import { requestJsonRpc } from "../../utils/connect";
import utils from "../../utils/utils2";
import config from "../../config";

const { nid } = config;

// Constants
const { setPrep } = chainMethods;

const initPrepDetailsForm = {
  name: "",
  email: "",
  country: "",
  city: "",
  website: "",
  details: "",
  nodeAddress: ""
};

const { parsePrepFormInputs, samples } = utils;

const { SET_PREP_SAMPLE: SETPREP } = samples;

export default function PrepModal({ prepInfo, isOpen, onClose }) {
  const [prepDetailsForm, setPrepDetailsForm] = useState(initPrepDetailsForm);

  function handlePrepFormSubmit() {
    handleFormSubmit("prep");
  }

  async function handleFormSubmit(type) {
    let inputData = null;
    let txData = null;

    switch (type) {
      case "prep":
        inputData = parsePrepFormInputs(prepDetailsForm);
        console.log("inputData");
        console.log(inputData);

        if (inputData == null) {
        } else {
          txData = setPrep(prepInfo.address, inputData, nid);
          console.log("txData");
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
      console.log("wallet response");
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
        <GenericModal isOpen={isOpen} onClose={onClose} useSmall={true}>
          <div>
            <div className={styles.main}>
              <div className={styles.defaultSection}></div>
              <div className={styles.defaultSection}>
                <h2>Update Prep on-chain data:</h2>
                <p></p>
                <p>
                  Use the following form to update your{" "}
                  <a
                    href="https://docs.icon.community/icon-stack/client-apis/json-rpc-api/v3#setprep"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prep data
                  </a>
                  , a transaction will be signed with your node address using
                  your preferred wallet, you can see the details of the
                  transaction before submitting it in the wallet popup window.
                </p>
                <p>
                  <span className={styles.bold}>Note:</span> you only need to
                  define the fields that you want to change the rest wont be
                  modified in the network.
                </p>
                <div className={styles.setPrepForm}>
                  <div className={styles.table}>
                    {[
                      ["name", prepInfo.name, "Name:", prepDetailsForm.name],
                      [
                        "email",
                        prepInfo.email,
                        "Email:",
                        prepDetailsForm.email
                      ],
                      [
                        "country",
                        prepInfo.country,
                        "Country:",
                        prepDetailsForm.country
                      ],
                      ["city", prepInfo.city, "City:", prepDetailsForm.city],
                      [
                        "website",
                        prepInfo.website,
                        "Website:",
                        prepDetailsForm.website
                      ],
                      [
                        "details",
                        prepInfo.details,
                        "Details:",
                        prepDetailsForm.details
                      ],
                      [
                        "nodeAddress",
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
                      );
                    })}
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={handlePrepFormSubmit}
                >
                  Update
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
