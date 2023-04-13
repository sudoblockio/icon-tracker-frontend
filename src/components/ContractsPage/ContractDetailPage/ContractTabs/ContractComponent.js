import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { LoadingComponent } from "../../../../components";
import ButtonSet from "./ButtonSet";
import MiscComponents from "./MiscContractComponents";
import customStyles from "./ContractComponent.module.css";
import { customMethod } from "../../../../utils/rawTxMaker";

const { ReadMethodItems, WriteMethodItems } = MiscComponents;

const HARDCODED_NID_FIX_THIS = 2;

function ContractComponent({
  contract,
  contractReadWriteInfo,
  icxCall,
  icxSendTransaction,
  walletAddress
}) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: value
    });
  };

  function handleClickOnReadonly(
    address, 
    method, 
    inputs, 
    index, 
  ) {
      console.log(address, "params address");
      const paramsData = makeParams(method, inputs);
      icxCall({
        address,
        method,
        params: paramsData,
        index
      });
  }

  function handleClickOnWrite(
    address,
    method,
    inputs,
    index
  ) {
    // makeTxCallRpcObj
    const nid = HARDCODED_NID_FIX_THIS;

    if (walletAddress === "") {
      alert("Please connect to wallet first");
    } else {
      const paramsData = makeParams(method, inputs);
      const rawMethodCall = customMethod(
        walletAddress,
        address,
        method,
        paramsData,
        nid
      );
      icxSendTransaction({
        params: { ...rawMethodCall },
        index: index
      });
    }
  }

  const makeParams = (funcName, inputs) => {
    const result = {};
    inputs.forEach(item => {
      const name = item["name"];
      const type = item["type"];
      const inputName = `${funcName}_${name}_${type}`;
      const value = params[inputName] || "";
      result[name] = value;
    });
    return result;
  };

  const { data } = contract;
  const { address } = data;
  const { loading, error } = contractReadWriteInfo;
  const contractMethodsState = createContractMethodsState(
    contractReadWriteInfo
  );

  //TODO: remove this useEffect after testing and refactoring
  useEffect(() => {
    console.log("contractReadWriteInfo and contractWriteInfo");
    console.log(contractReadWriteInfo);
    console.log("contract method state");
    console.log(contractMethodsState);
  }, [contractReadWriteInfo]);

  return (
    <div className="contents">
      <ButtonSet
        activeButton={activeSection}
        handleActiveChange={setActiveSection}
      />
      <div className={customStyles.contractContainer}>
        {activeSection === 0 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read/Write Contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <ReadMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnReadonly}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        ) : activeSection === 1 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <ReadMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnReadonly}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        ) : activeSection === 2 ? (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Write contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <WriteMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnWrite}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={customStyles.titleContainer}>
            <span className={customStyles.titleItem}>
              Read/Write Contract methods
            </span>
            {loading ? (
              <LoadingComponent height="322px" />
            ) : (
              <div className="scroll">
                {!!error ? (
                  <ul className="list">
                    <li>{error}</li>
                  </ul>
                ) : (
                  <ReadMethodItems
                    methods={contractMethodsState}
                    params={params}
                    handleChange={handleChange}
                    handleClick={handleClickOnReadonly}
                    address={address}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function createContractMethodsState(contractReadWriteInfo) {
  //
  const { funcList, funcOutputs, writeFuncList } = contractReadWriteInfo;
  const result = {
    readOnlyMethodsNameArray: [],
    writeMethodsNameArray: []
  };
  funcList.forEach((func, index) => {
    const funcName = func["name"];
    result.readOnlyMethodsNameArray.push(funcName);
    const inputs = { ...func };
    const outputs = funcOutputs[index];
    result[funcName] = {
      inputs,
      outputs
    };
  });
  writeFuncList.forEach((func, index) => {
    const funcName = func["name"];
    result.writeMethodsNameArray.push(funcName);
    const inputs = { ...func };
    const outputs = { error: "", valueArray: [] };
    result[funcName] = {
      inputs,
      outputs
    };
  });

  return result;
}

export default ContractComponent;
