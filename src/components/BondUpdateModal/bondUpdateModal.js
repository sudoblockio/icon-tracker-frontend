import React, { useState, useEffect, useRef } from "react";
import styles from "./prepUpdateModal.module.css";
import { Hr, LoadingComponent, WalletResponseModal } from "../CommonComponent/customComponents";
import GenericModal from "../GenericModal/genericModal";
import {
  governanceMethods,
  chainMethods
} from "../../utils/rawTxMaker";
import { getBonders } from "../../redux/store/iiss";
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

const initBonderForm = {
  bonder1: "",
  bonder2: "",
  bonder3: "",
  bonder4: "",
  bonder5: "",
  bonder6: "",
  bonder7: "",
  bonder8: "",
  bonder9: "",
  bonder10: ""
};

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
  parseBonderFormInputs,
  parsePrepFormInputs,
  samples,
  isValidICONAddress
} = utils;

const { 
  DETAILS_SAMPLE: CODE,
  SET_PREP_SAMPLE: SETPREP,
  DETAILS_2_SAMPLE: DETAILSJSON
} = samples;

export default function PrepModal({ prepInfo }) {
  // const [overviewState, setOverviewState] = useState(initPrepDetailsForm);
  // const [overviewState, setOverviewState] = useState(null);
  // const [prepDetailsState, setPrepDetailsState] = useState(null);
  // const [bondedInfoState, setBondedInfoState] = useState(null);
  const [bonderList, setBonderList] = useState([]);
  const [prepDetailsForm, setPrepDetailsForm] = useState(initPrepDetailsForm);
  const [txResults, setTxResults] = useState(initialTxResultState);
  const [bonderForm, setBonderForm] = useState(initBonderForm);
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const [walletResponse, setWalletResponse] = useState(null);

  let txRef = useRef(null);
  let countdownRef = useRef(0);
  const nid = HARDCODED_NID_FIX_THIS;

  console.log('prepInfo');
  console.log(prepInfo);
  function handleWalletModalOnClose() {
    setWalletModalIsOpen(false);
    setWalletResponse(null);
    setTxResults(initialTxResultState);
    handleClearInterval();
  }

  function handleFormInputChange(evnt) {
    const { value, name } = evnt.target;

    setBonderForm(bonderState => {
      let newState = { ...bonderState };
      newState[name] = value;

      return newState;
    });
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

  function handleBonderFormSubmit() {
    handleFormSubmit("bond");
  }

  function handlePrepFormSubmit() {
    handleFormSubmit("prep");
  }

  function handleFormSubmit(type) {
    let inputData = null;
    let txData = null;

    switch (type) {
      // case "bond":
      //   inputData = parseBonderFormInputs(bonderForm);
      //   txData = setBonderList(localData.auth.selectedWallet, inputData);
      //   break;
      case "prep":
        inputData = parsePrepFormInputs(prepDetailsForm);

        if (inputData == null) {
        } else {
          txData = setPrep(prepInfo.addres, inputData, nid);
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

    async function getBondersData() {
      //
      const payload = { address: prepInfo.node_address };
      const bonderListData = await getBonders(payload);
      if (bonderListData != null && bonderListData.length != null) {
        setBonderList(bonderListData);
      }
    }
    if (prepInfo != null) {
      if (prepInfo.node_address != null) {
        getBondersData();
      }
    }

  }, [prepInfo])

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
        <div>
          <div className={styles.main}>
            <div className={styles.defaultSection}>
              <h2>Bonded Info:</h2>
              <p>
                A maximum of 10 addresses are allowed to be added to the{" "}
                <i>bonderList</i> of your node. You can use the following form to
                update your <i>bonderList</i> configuration, a transaction will be
                signed with your address using your preffered wallet software, the
                details of the transaction will be shown in the wallet popup
                window before approving the transaction.
              </p>
              <p>Current wallets allowed to place bond for your node:</p>
                <ul>
                  {bonderList.map((wallet, index) => {
                    return (
                      <li key={`${wallet}-${index}`}>
                        {/* <a href={utils.parseBonderWallet(wallet)} target="_blank"> */}
                        {/*   {wallet} */}
                        {/* </a> */}
                          {wallet}
                      </li>
                    );
                  })}
                </ul>
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
                      ["bonder1", bonderForm.bonder1, "Bonder 1:"],
                      ["bonder2", bonderForm.bonder2, "Bonder 2:"],
                      ["bonder3", bonderForm.bonder3, "Bonder 3:"],
                      ["bonder4", bonderForm.bonder4, "Bonder 4:"],
                      ["bonder5", bonderForm.bonder5, "Bonder 5:"],
                      ["bonder6", bonderForm.bonder6, "Bonder 6:"],
                      ["bonder7", bonderForm.bonder7, "Bonder 7:"],
                      ["bonder8", bonderForm.bonder8, "Bonder 8:"],
                      ["bonder9", bonderForm.bonder9, "Bonder 9:"],
                      ["bonder10", bonderForm.bonder10, "Bonder 10:"]
                    ].map((arrItem, index) => {
                      return (
                        <div
                          key={`bonder-item-${index}`}
                          className={styles.tableRow}
                        >
                          <p className={styles.tableRowLabel}>
                            <b>{arrItem[2]}</b>
                          </p>
                          <input
                            type="text"
                            name={arrItem[0]}
                            value={arrItem[1]}
                            onChange={handleFormInputChange}
                            placeholder={bonderList[index] || ""}
                            className={
                              isValidICONAddress(arrItem[1]) === true
                                ? `${styles.tableRowInput} ${styles.tableRowInputValid}`
                                : `${styles.tableRowInput} ${styles.tableRowInputInvalid}`
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className={styles.button}
                    onClick={handleBonderFormSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <Hr />
            </div>
            <div className={styles.defaultSection}>
              <h2>Update Prep on-chain data:</h2>
              <p>
                <a
                  href="https://docs.icon.community/icon-stack/client-apis/json-rpc-api/v3#setprep"
                  target="_blank"
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
      ) : (
        <></>
      )
      }
    </div>
  );
}
