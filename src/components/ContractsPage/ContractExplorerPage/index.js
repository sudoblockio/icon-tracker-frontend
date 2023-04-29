import React, { useState, useEffect } from "react";
import MiscComponents from "../MiscComponents/MiscContractComponents";
import { LoadingComponent } from "../../../components";
import ButtonSet from "../MiscComponents/ButtonSet";
import styles from "./ContractExplorerPage.module.css";
import { isCxAddress } from "../../../utils/utils";
import { customMethod } from "../../../utils/rawTxMaker";
import { makeParams, createContractMethodsState } from "../contractUtils";

const { ReadMethodItems, WriteMethodItems } = MiscComponents;

const initialInputItemsState = {
  address: "cx0000000000000000000000000000000000000000",
  endpoint: "http://localhost:9000",
  nid: "3"
};

function ContractExplorerPage({
  icxCall,
  readContractInformation, 
  icxGetScore, 
  contractAbi,
  contract,
  contractReadInfo,
  walletAddress,
  wallet,
  icxSendTransaction
}) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [networkState, setNetworkState] = useState("mainnet");
  const [inputItemsState, setInputItemsState] = useState(
    initialInputItemsState
  );
  const [cxAbi, setCxAbi] = useState(null);

  console.log('updated contract read write info');
  console.log(contractReadInfo);
  const { data } = contract;
  const { address } = data;
  const { loading, error } = contractReadInfo;
  const contractMethodsState = createContractMethodsState(
    contractReadInfo
  );

  function handleParamsChange(event) {
    const { name, value } = event.target;
    setParams(state => {
      return {
        ...state,
        [name]: value
      }
    });
  }

  function handleClickOnReadonly(address, method, inputs, index) {
    const paramsData = makeParams(params, method, inputs);
    icxCall({
      address,
      method,
      params: paramsData,
      index
    })
  }

  function onNetworkChange(e) {
    console.log(e.target.value);
    setNetworkState(e.target.value);
  }

  function handleInputChange(event, label) {
    console.log("event target");
    console.log(event.target);
    event.persist();
    setInputItemsState(state => {
      return {
        ...state,
        [label]: event.target.value
      };
    });
  }

  function handleClickOnWrite(address, method, inputs, index) {
    const nid = 2;

    if (walletAddress === "") {
      alert("Please connect to wallet first");
    } else {
      const paramsData = makeParams(params, method, inputs);
      const rawMethodCall = customMethod(
        walletAddress,
        address,
        method,
        paramsData,
        nid
      )
    }
  }

  function handleAddressInputChange(event) {
    handleInputChange(event, "address");
  }

  useEffect(() => {
    const isValidCxAddress = isCxAddress(inputItemsState.address);

    if (isValidCxAddress) {
      if (networkState === "custom") {
        // TODO: put logic for custom network here
      } else {
        readContractInformation(
          {
            address: inputItemsState.address
          },
          networkState
        );
        icxGetScore(
          {
            address: inputItemsState.address
          },
          networkState
        );
      }
    }
  }, [networkState, inputItemsState]);

  useEffect(() => {
    if (!contractAbi.loading) {
      setCxAbi(contractAbi.data);
    }
  }, [contractAbi]);

  useEffect(() => {
  }, []);

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
            <DropdownItem label={`Network`} onSelectChange={onNetworkChange} />
            {networkState === "custom" && (
              <>
                <Separator />
                <CustomNetworkItem
                  endpointLabel={`Endpoint`}
                  endpointNid={`NID`}
                  values={inputItemsState}
                  onValuesChange={handleInputChange}
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
                  {loading ? (
                    <LoadingComponent height="322px" />
                  ) : !!error ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{error}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={address}
                      />
                      <WriteMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={address}
                        startIndex={contractMethodsState.readOnlyMethodsNameArray.length}
                      />
                    </div>
                  )
                  }
                </div>
              ) : activeSection === 1 ? (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Read Contract Methods
                  </span>
                  {loading ? (
                    <LoadingComponent height="322px" />
                  ) : !!error ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{error}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={address}
                      />
                    </div>
                  )
                  }
                </div>
              ) : activeSection === 2 ? (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Write Contract Methods
                  </span>
                  {loading ? (
                    <LoadingComponent height="322px" />
                  ) : !!error ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{error}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <WriteMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={address}
                      />
                    </div>
                  )
                  }
                </div>
              ) : (
                <div className={styles.titleContainer}>
                  <span className={styles.titleItem}>
                    Read/ Write Contract Methods
                  </span>
                  {loading ? (
                    <LoadingComponent height="322px" />
                  ) : !!error ? (
                    <div className="scroll">
                      <ul className="list">
                        <li>{error}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="scroll">
                      <ReadMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnReadonly}
                        address={address}
                      />
                      <WriteMethodItems
                        methods={contractMethodsState}
                        params={params}
                        handleChange={handleParamsChange}
                        handleClick={handleClickOnWrite}
                        address={address}
                        startIndex={contractMethodsState.readOnlyMethodsNameArray.length}
                      />
                    </div>
                  )
                  }
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
  halfSize = false
}) {
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
          className={styles.inputItemInput}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}

function DropdownItem({ label, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemLabel}>{label}</div>
      <div className={styles.dropdownItemContent}>
        <select className={styles.dropdownItemSelect} onChange={onSelectChange}>
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
  onValuesChange
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
