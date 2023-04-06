import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { LoadingComponent } from "../../../../components";
import ButtonSet from "./ButtonSet";
import MiscComponents from "./MiscContractComponents";
import customStyles from "./ContractComponent.module.css";

const { ReadMethodItems, ReadMethodItems2 } = MiscComponents;

function ContractComponent({ contract, contractReadWriteInfo, icxCall }) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: value
    });
  };

  const handleClick = (address, method, inputs, index) => {
    console.log(address, "params address");
    const paramsData = makeParams(method, inputs);
    icxCall({
      address,
      method,
      params: paramsData,
      index
    });
  };

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
  //TODO: after finishing testing and refactoring we can remove 
  // funcList and funcOutputs, then we can rename the methods with 
  // names ending in "2" (readMethodItems2, createContractMethodsState2, etc)
  // to the original names (readMethodItems, createContractMethodsState, etc)
  const { loading, funcList, funcOutputs, error } = contractReadWriteInfo;
  const contractMethodsState = createContractMethodsState(contractReadWriteInfo)

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
      <div className="code-box read">
        <div className="title-group">
          {activeSection === 0 ? (
            <span className="title">Read/Write Contract information</span>
          ) : activeSection === 1 ? (
            <span className="title">Read contract methods</span>
          ) : activeSection === 2 ? (
            <span className="title">Write contract events</span>
          ) : (
            <span className="title">Read/Write Contract information</span>
          )}
        </div>
        {loading ? (
          <LoadingComponent height="322px" />
        ) : (
          <div className="scroll">
            {!!error ? (
              <ul className="list">
                <li>{error}</li>
              </ul>
            ) : (
              <ReadMethodItems2
                methods={contractMethodsState}
                params={params}
                handleChange={handleChange}
                handleClick={handleClick}
                address={address}
              />
              // <ReadMethodItems
              // funcList={funcList}
              // funcOutputs={funcOutputs}
              // params={params}
              // handleChange={handleChange}
              // handleClick={handleClick}
              // address={address}
              // />
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
