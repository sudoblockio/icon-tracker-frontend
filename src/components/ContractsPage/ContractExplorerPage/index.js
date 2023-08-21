import React, { useState, useEffect } from "react";
import MiscComponents from "../MiscComponents/MiscContractComponents";
import queryString from "query-string";
import { LoadingComponent } from "../../../components";
import ButtonSet from "../MiscComponents/ButtonSet";
import styles from "./ContractExplorerPage.module.css";
import { isCxAddress, isValidUrl } from "../../../utils/utils";
import { customMethod } from "../../../utils/rawTxMaker";
import {
  makeParams,
  createContractMethodsState,
  localReadContractInformationFunc
} from "../contractUtils";
import config from "../../../config";
import { icxGetScore, icxCall } from "../../../redux/api/restV3/icx";
import { icxSendTransaction } from "../../../redux/api/jsProvider/icx";
import ledger from "../../../utils/ledger";
const { nid, CONTRACT_WRITE_EVENTLOG_ENABLED, network } = config;

const { ReadMethodItems, WriteMethodItems } = MiscComponents;

function getInitialInputState(url) {
  const qs = queryString.parse(url.search);
  const initialInputState = {
    address: qs.address || "cx0000000000000000000000000000000000000000",
    endpoint: "",
    nid: "3"
  };
  return initialInputState;
}

function getNetworkState(network) {
  const f = ["mainnet", "berlin", "lisbon"];

  if (f.includes(network)) {
    return network;
  } else {
    return "mainnet";
  }
}

function ContractExplorerPage({ wallet, url, walletType, bip44Path }) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [networkState, setNetworkState] = useState(getNetworkState(network));
  const [inputItemsState, setInputItemsState] = useState(
    getInitialInputState(url)
  );
  const [contractAbi, setContractAbi] = useState(null);
  const [cxAbi, setCxAbi] = useState(null);
  const [contractReadInfo, setContractReadInfo] = useState(null);
  const [endpointInputHasFocus, setEndpointInputHasFocus] = useState(null);

  function handleParamsChange(event) {
    const { name, value } = event.target;
    setParams(state => {
      return {
        ...state,
        [name]: value
      };
    });
  }

  function handleFocusChange(hasFocus) {
    console.log("hasFocus", hasFocus);
    setEndpointInputHasFocus(hasFocus);
  }

  function onNetworkChange(e) {
    setNetworkState(e.target.value);
  }

  function handleInputChange(event, label) {
    event.persist();
    setInputItemsState(state => {
      return {
        ...state,
        [label]: event.target.value
      };
    });
  }

  async function handleClickOnReadonly(
    address,
    method,
    inputs,
    index,
    networkState,
    endpoint
  ) {
    const paramsData = makeParams(params, method, inputs);
    const response = await icxCall(
      {
        from: "hxbe258ceb872e08851f1f59694dac2558708ece11",
        to: address,
        dataType: "call",
        data: {
          method: method,
          params: paramsData
        }
      },
      networkState,
      endpoint
    );

    setContractReadInfo(state => {
      const prevState = { ...state };
      prevState[method].outputs = {
        error: response.error == null ? "" : response.error.message,
        valueArray: response.data == null ? "" : [response.data.result],
        state: 1
      };
      return prevState;
    });
  }

  async function handleClickOnWrite(
    address,
    method,
    inputs,
    index,
    networkState,
    endpoint
  ) {
    console.log("wallet, walletType, bip44Path");
    console.log(wallet);
    console.log(walletType);
    console.log(bip44Path);

    if (wallet === "") {
      alert("Please connect to wallet first");
    } else {
      const paramsData = makeParams(params, method, inputs);
      const rawMethodCall = customMethod(
        wallet,
        address,
        method,
        paramsData,
        nid
      );
      if (walletType === "ICONEX") {
        // handle signing with ICONex
        const response = await icxSendTransaction({
          rawTx: { ...rawMethodCall },
          index: index
        });

        setContractReadInfo(state => {
          const prevState = { ...state };
          prevState[method].outputs = {
            error: response.error == null ? "" : response.error.message,
            valueArray: response.data == null ? "" : [response.data.result],
            state: 1
          };
          return prevState;
        });
      } else if (walletType === "LEDGER") {
        // handle signing with ledger
        console.log('raw method call');
        console.log(rawMethodCall);
        const serializedTx = ledger.getSerializedTx(rawMethodCall.params);
        console.log(serializedTx);
      } else {
        alert(`ERROR: walletType ${walletType} not supported;`);
      }
    }
  }

  function handleAddressInputChange(event) {
    handleInputChange(event, "address");
  }

  useEffect(() => {
    //TODO: modify this section to work on any network (mainnet, lisbon, berlin, etc);
    const isValidCxAddress = isCxAddress(inputItemsState.address);
    setContractAbi(null);

    async function getAbi(address, networkState, endpoint = "") {
      let abi = {
        error: {
          message: ""
        }
      };
      const response = await icxGetScore(
        {
          address: address
        },
        networkState,
        endpoint
      );

      console.log("result of icxGetScore");
      console.log(response);

      // TODO: to improve error handling for the icxGetScore
      // response, validate if the response is an object with a
      // data param with the following shape:
      // {
      //   jsonrpc: "2.0",
      //   result: Array<AbiItem>,
      //   id: 1234
      // }
      //
      // where AbiItem is defined as:
      // {
      //   type: "function" | "event",
      //   name: string,
      //   inputs: Array<{ type: string, name: string }>,
      //   outputs: Array<{ type: string, name: string }>,
      // }
      //
      // possible logic for this can be:
      //
      // if (typeof response === "object"
      //      && response.data != null
      //      ) {
      //      if (response.data.result != null) {
      //        if (Array.isArray(response.data.result)) {
      //          if (isValidAbi(response.data.result)) {
      //          ... do something
      //          }
      //        }
      //      }
      //    }
      //
      // And define the function 'isValidAbi' with a logic to check
      // if the response.data.result is an array of AbiItem
      //
      if (typeof response === "string") {
        abi.error.message = response;
      } else {
        abi = { ...response };
      }

      if (abi.error == null) {
        const abiStateFromRedux = await localReadContractInformationFunc(
          abi.data.result,
          address,
          networkState,
          endpoint
        );
        const abiStateParsed = createContractMethodsState(abiStateFromRedux);
        console.log("Abi data parsed:");
        console.log(abiStateFromRedux);
        console.log(abiStateParsed);
        setContractReadInfo(abiStateParsed);
      }
      setContractAbi(abi);
    }

    if (isValidCxAddress) {
      if (networkState === "custom") {
        if (
          endpointInputHasFocus === false &&
          isValidUrl(inputItemsState.endpoint)
        ) {
          // TODO: add code to fetch abi from custom url here
          getAbi(
            inputItemsState.address,
            networkState,
            inputItemsState.endpoint
          );
        }
      } else {
        getAbi(inputItemsState.address, networkState, inputItemsState.endpoint);
      }
    }
  }, [networkState, inputItemsState, endpointInputHasFocus]);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.pageTitle}>Contract Writer</div>
        <div className={`${styles.pageContent}`}>
          <div
            className={`${styles.pageContentHeader} ${styles.paperContainer}`}
          >
            <InputItem
              label={`Address`}
              value={inputItemsState.address}
              onValueChange={handleAddressInputChange}
            />
            <Separator />
            <DropdownItem
              label={`Network`}
              value={networkState}
              onSelectChange={onNetworkChange}
            />
            {networkState === "custom" && (
              <>
                <Separator />
                <CustomNetworkItem
                  endpointLabel={`Endpoint`}
                  endpointNid={`NID`}
                  values={inputItemsState}
                  onValuesChange={handleInputChange}
                  handleFocusChange={handleFocusChange}
                />
              </>
            )}
          </div>
          <div className={`${styles.pageContentBody} ${styles.paperContainer}`}>
            <ButtonSet
              activeButton={activeSection}
              handleActiveChange={setActiveSection}
            />
            <div className={styles.contractContainer}>
              {activeSection === 0 ? (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Read/Write Contract Methods
                  </span>
                  {contractAbi == null ? (
                    <LoadingComponent height="322px" />
                  ) : contractAbi.error != null ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{contractAbi.error.message}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={inputItemsState.address}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                      <WriteMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={inputItemsState.address}
                        startIndex={
                          contractReadInfo.readOnlyMethodsNameArray.length
                        }
                        showEvents={CONTRACT_WRITE_EVENTLOG_ENABLED}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                    </div>
                  )}
                </div>
              ) : activeSection === 1 ? (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Read Contract Methods
                  </span>
                  {contractAbi == null ? (
                    <LoadingComponent height="322px" />
                  ) : contractAbi.error != null ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{contractAbi.error.message}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={inputItemsState.address}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                    </div>
                  )}
                </div>
              ) : activeSection === 2 ? (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Write Contract Methods
                  </span>
                  {contractAbi == null ? (
                    <LoadingComponent height="322px" />
                  ) : contractAbi.error != null ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{contractAbi.error.message}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <WriteMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={inputItemsState.address}
                        showEvents={CONTRACT_WRITE_EVENTLOG_ENABLED}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Read/ Write Contract Methods
                  </span>
                  {contractAbi == null ? (
                    <LoadingComponent height="322px" />
                  ) : contractAbi.error != null ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{contractAbi.error.message}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={inputItemsState.address}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                      <WriteMethodItems
                        methods={contractReadInfo}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={inputItemsState.address}
                        startIndex={
                          contractReadInfo.readOnlyMethodsNameArray.length
                        }
                        showEvents={CONTRACT_WRITE_EVENTLOG_ENABLED}
                        network={networkState}
                        endpoint={inputItemsState.endpoint}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputItem({
  label,
  value,
  onValueChange,
  useSmall = false,
  placeholder = "cx0000..",
  halfSize = false,
  borderStyle = null,
  handleFocusChange = null
}) {
  let borderColorClass;

  if (borderStyle == null) {
    borderColorClass = styles.borderGray;
  } else {
    if (borderStyle === true) {
      borderColorClass = styles.borderGreen;
    } else if (borderStyle === false) {
      borderColorClass = styles.borderRed;
    } else {
      borderColorClass = styles.borderGray;
    }
  }

  function handleOnFocus() {
    if (handleFocusChange != null) {
      handleFocusChange(true);
    }
  }

  function handleOnBlur() {
    if (handleFocusChange != null) {
      handleFocusChange(false);
    }
  }

  return (
    <div
      className={
        halfSize
          ? `${styles.inputItem} ${styles.inputItemHalfSize}`
          : `${styles.inputItem}`
      }
    >
      <div className={styles.inputItemLabel}>{label}</div>
      <div
        className={
          !useSmall
            ? `${styles.inputItemContent}`
            : `${styles.inputItemContent} ${styles.inputItemContentSmall}`
        }
      >
        <input
          className={`${styles.inputItemInput} ${borderColorClass}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
}

function DropdownItem({ label, value, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemLabel}>{label}</div>
      <div className={styles.dropdownItemContent}>
        <select
          className={styles.dropdownItemSelect}
          onChange={onSelectChange}
          value={value || "mainnet"}
        >
          <option value="mainnet">Mainnet</option>
          <option value="berlin">Berlin</option>
          <option value="lisbon">Lisbon</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
}

function CustomNetworkItem({
  endpointLabel,
  endpointNid,
  values,
  onValuesChange,
  handleFocusChange
}) {
  function handleEndpointChange(event) {
    onValuesChange(event, "endpoint");
  }

  function handleNidChange(event) {
    onValuesChange(event, "nid");
  }

  return (
    <div className={styles.customNetworkItem}>
      <InputItem
        label={endpointLabel}
        value={values.endpoint}
        onValueChange={handleEndpointChange}
        borderStyle={isValidUrl(values.endpoint)}
        handleFocusChange={handleFocusChange}
        placeholder={"localhost:9080"}
      />
      <Separator useVertical={true} />
      <InputItem
        label={endpointNid}
        useSmall={true}
        placeholder="3"
        value={values.nid}
        onValueChange={handleNidChange}
      />
    </div>
  );
}

function Separator({ useVertical = false }) {
  return (
    <div
      className={
        useVertical ? `${styles.separatorVertical}` : `${styles.separator}`
      }
    ></div>
  );
}
export default ContractExplorerPage;
