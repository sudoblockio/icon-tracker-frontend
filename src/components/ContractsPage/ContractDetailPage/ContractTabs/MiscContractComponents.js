import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import styles from "./MiscContractComponents.module.css";

function ReadMethodItems({
  methods,
  params,
  handleChange,
  handleClick,
  address,
  startIndex = 0
}) {
  return (
    <ul className="list">
      {methods.readOnlyMethodsNameArray.map((methodName, index) => {
        const isExpandable =
          methods[methodName].inputs.readonly != null &&
          methods[methodName].inputs.readonly === "0x1"
            ? methods[methodName].inputs.inputs.length > 0
              ? true
              : methods[methodName].inputs.outputs[0].type === "dict" ||
                methods[methodName].inputs.outputs[0].type === "list"
              ? true
              : false
            : true;
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <CollapsableComponent
              methodInput={methods[methodName].inputs}
              methodName={methodName}
              methodOutput={methods[methodName].outputs}
              index={index}
              params={params}
              handleChangeParent={handleChange}
              handleClick={handleClick}
              address={address}
              isExpandable={isExpandable}
              startIndex={startIndex}
            />
          </div>
        );
      })}
    </ul>
  );
}

function WriteMethodItems({
  methods,
  params,
  handleChange,
  handleClick,
  address,
  startIndex = 0
}) {
  return (
    <ul className="list">
      {methods.writeMethodsNameArray.map((methodName, index) => {
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <CollapsableComponent
              methodInput={methods[methodName].inputs}
              methodName={methodName}
              methodOutput={methods[methodName].outputs}
              index={index}
              params={params}
              handleChangeParent={handleChange}
              handleClick={handleClick}
              address={address}
              isExpandable={true}
              alwaysShowButton={true}
              startIndex={startIndex}
            />
          </div>
        );
      })}
    </ul>
  );
}

function CollapsableComponent({
  methodInput,
  methodName,
  methodOutput,
  index,
  params,
  handleChangeParent,
  handleClick,
  address,
  isExpandable,
  startIndex,
  alwaysShowButton = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const [responseState, setResponseState] = useState("");
  const outputType =
    methodInput.readonly != null && methodInput.readonly === "0x1"
      ? methodInput.outputs[0].type
      : "";
  const parsedMethodOutput =
    methodInput.readonly != null && methodInput.readonly === "0x1"
      ? JSON.stringify(methodOutput.valueArray[0])
      : "";

  function toggleOpen() {
    setIsOpen(state => !state);
  }

  function handleButtonClick() {
    handleClick(address, methodName, methodInput.inputs, index);
    setResultIsOpen(true);
  }

  function parseResponse(response) {
    if (response.error === "") {
      const parsedResponse = JSON.stringify(response.valueArray);
      return parsedResponse;
    } else {
      return response.error;
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setResultIsOpen(false);
    } else {
      if (methodInput.inputs.length === 0) {
        setResultIsOpen(true);
      }
    }
  }, [isOpen, methodInput.inputs]);

  useEffect(() => {
    console.log('method output');
    console.log(methodOutput);
    const parsedResponse = parseResponse(methodOutput);
    setResponseState(parsedResponse);
  }, [methodOutput]);

  return (
    <div
      className={
        !isExpandable
          ? `${styles.writeMethodContainer} ${styles.writeMethodContainerClosed}`
          : isOpen
          ? `${styles.writeMethodContainer} ${styles.writeMethodContainerOpen}`
          : `${styles.writeMethodContainer} ${styles.writeMethodContainerClosed}`
      }
    >
      <div
        className={
          isExpandable
            ? `${styles.writeMethodTitle} ${styles.writeMethodTitleExpandable}`
            : `${styles.writeMethodTitle}`
        }
        onClick={toggleOpen}
      >
        <div className={styles.writeMethodTitleLeft}>
          <span>{index + 1 + startIndex}.</span>
          <span>{methodName}</span>{" "}
          {!isExpandable && (
            <span className={styles.writeMethodTitleLeftOutput}>
              {parsedMethodOutput}
            </span>
          )}
          <span>
            <em>{outputType}</em>
          </span>{" "}
        </div>
        {isExpandable && (
          <div className={styles.writeMethodTitleRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                !isOpen
                  ? `${styles.writeMethodTitleIcon}`
                  : `${styles.writeMethodTitleIcon} ${styles.writeMethodTitleIconRotated}`
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.writeMethodBody}>
        {methodInput.inputs.length > 0 &&
          methodInput.inputs.map((input, index2) => {
            const name = input["name"];
            const type = input["type"];
            const inputName = `${methodName}_${name}_${type}`;
            const placeholder = `${name} (${type})`;
            const value = params[inputName] || "";

            return (
              <div
                className={styles.writeMethodBodyInput}
                key={`writeMethod-element-${index2}`}
              >
                <div className={styles.writeMethodBodyInputName}>
                  {placeholder}
                </div>
                <div className={styles.writeMethodBodyInputType}>
                  <input
                    type="text"
                    key={`writeMethod-${index2}`}
                    name={inputName}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChangeParent}
                  />
                </div>
              </div>
            );
          })}
        {(methodInput.inputs.length > 0 || alwaysShowButton) && (
          <div className={styles.methodInputButtonContainer}>
            <button
              className={styles.methodInputButton}
              onClick={handleButtonClick}
            >
              Query
            </button>
          </div>
        )}
      </div>
      {(resultIsOpen && methodOutput.state > 0) && (
        <div
          className={
            methodOutput.error === ""
              ? `${styles.writeMethodBodyOutput} ${styles.writeMethodBodyOutputSuccess}`
              : `${styles.writeMethodBodyOutput} ${styles.writeMethodBodyOutputError}`
          }
        >
          <p>Response:</p>
          <p className={styles.writeMethodBodyOutputResponseContent}>
            {responseState}
          </p>
        </div>
      )}
    </div>
  );
}

const MiscComponents = {
  ReadMethodItems,
  WriteMethodItems
};

export default MiscComponents;
