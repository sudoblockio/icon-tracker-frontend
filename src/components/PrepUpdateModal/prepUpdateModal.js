import React, { useState, useEffect, useRef } from "react";
import styles from "./prepUpdateModal.module.css";
import { WalletResponseModal } from "../CommonComponent/customComponents";
import GenericModal from "../GenericModal/genericModal";
import {
  chainMethods
} from "../../utils/rawTxMaker";
// import { getBonders } from "../../redux/store/iiss";
// import NodeButlerSDK from "../utils/customLib";
// import { v4 as uuidv4 } from "uuid";
import utils from "../../utils/utils2";

// const nodeButlerLib = new NodeButlerSDK();
// const {
//   getPrep,
//   parsePrepData,
//   getBonderList,
//   getPrepFromNB,
//   parsePrepFromNB,
//   getPrepLogoUrl,
//   setBonderList,
//   getParsedTxResult,
//   makeTxCallRPCObj,
//   setPrep
// } = nodeButlerLib;

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

const MAX_WAIT_PERIOD = utils.MAX_WAIT_PERIOD;
const initialTxResultState = utils.initialTxResultState;

// this NID is hardcoded to lisbon testnet until a way to fix the nid
// depending on the network is developed
const HARDCODED_NID_FIX_THIS = 2;

const {
  // parseBonderFormInputs,
  parsePrepFormInputs,
  samples
  // isValidICONAddress
} = utils;

const { 
  // DETAILS_SAMPLE: CODE,
  SET_PREP_SAMPLE: SETPREP
  // DETAILS_2_SAMPLE: DETAILSJSON
} = samples;

export default function PrepModal({ prepInfo, isOpen, onClose }) {
  const [prepDetailsForm, setPrepDetailsForm] = useState(initPrepDetailsForm);
  const [txResults, setTxResults] = useState(initialTxResultState);
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const [walletResponse, setWalletResponse] = useState(null);

  let txRef = useRef(null);
  let countdownRef = useRef(0);
  const nid = HARDCODED_NID_FIX_THIS;

  function handleWalletModalOnClose() {
    setWalletModalIsOpen(false);
    setWalletResponse(null);
    setTxResults(initialTxResultState);
    handleClearInterval();
  }

  function dispatchTxEvent(txData) {
    window.dispatchEvent(
      new CustomEvent("ICONEX_RELAY_REQUEST", {
        detail: {
          type: "REQUEST_JSON-RPC",
          payload: txData
        }
      })
    );
    // open modal window to show result of wallet tx request
    setWalletModalIsOpen(true);
  }

  function handlePrepFormSubmit() {
    handleFormSubmit("prep");
  }

  function handleFormSubmit(type) {
    let inputData = null;
    let txData = null;

    switch (type) {
      case "prep":
        inputData = parsePrepFormInputs(prepDetailsForm);

        if (inputData == null) {
        } else {
          txData = setPrep(prepInfo.address, inputData, nid);
        }
        break;
      default:
        break;
    }

    // dispatch event to wallet
    if (txData == null) {
      alert("Data for transaction is invalid");
    } else {
      dispatchTxEvent(txData);
    }
  }

  function handlePrepFormInputChange(evnt) {
    const { value, name } = evnt.target
    setPrepDetailsForm(prepFormState => {
      console.log(prepFormState);
      const newState = { ...prepFormState };
      newState[name] = value;

      return newState;
    });
  }

  function handleClearInterval() {
    try {
      countdownRef.current = 0;
      clearInterval(txRef.current);
    } catch (err) {
      console.log("error trying to clear interval");
      console.log(err);
    }
  }

  useEffect(() => {
    // define wallet event listener
    function handleWalletResponse(response) {
      setWalletResponse(response);
    }

    function runWalletEventListener(evnt) {
      utils.customWalletEventListener(
        evnt,
        handleWalletResponse,
        null,
        null,
        handleWalletModalOnClose
      );
    }

    // create event listener for Hana and ICONex wallets
    window.addEventListener("ICONEX_RELAY_RESPONSE", runWalletEventListener);

    // return the following function to perform cleanup of the event
    // listener on component unmount
    return function removeCustomEventListener() {
      window.removeEventListener(
        "ICONEX_RELAY_RESPONSE",
        runWalletEventListener
      );
    };
  }, []);

  useEffect(() => {
    if (
      txResults.txExists === true ||
      countdownRef.current >= MAX_WAIT_PERIOD
    ) {
      handleClearInterval();
    }
  }, [txResults]);

  // useEffect(() => {
  //   if (walletResponse == null) {
  //   } else {
  //     if (walletResponse.isError === true) {
  //     } else {
  //       txRef.current = setInterval(async () => {
  //         const txData = await getParsedTxResult(walletResponse.result);
  //         setTxResults(txData);

  //         countdownRef.current += 1;
  //       }, 1000);
  //     }
  //   }

  //   // returns function to clear interval on component dismount
  //   return () => {
  //     if (txRef.current == null) {
  //     } else {
  //       handleClearInterval();
  //     }
  //   };
  // }, [walletResponse]);

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
            <WalletResponseModal
              isOpen={walletModalIsOpen}
              onClose={handleWalletModalOnClose}
              txData={txResults}
              walletResponse={walletResponse}
            />
          </div>
        </GenericModal>
      ) : (
        <></>
      )
      }
    </div>
  );
}
