import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { LoadingComponent } from "../../../../components";
import styles from "./ContractWrite.module.css";

function ContractWrite({ contract, contractWriteInfo }) {
  console.log('contractWriteInfo');
  console.log(contractWriteInfo);
  const [paramsState, setParamsState] = useState({});
  const { data } = contract;
  const { address: address } = data;
  const loading = contractWriteInfo != null ? contractWriteInfo.loading : true;

  return (
    <div className="contents">
      <div className="code-box read">
        <div className="title-group">
          <span className="title">Write contract information</span>
        </div>
        {loading ? (
          <LoadingComponent height="322px" />
        ) : (
          <div className="scroll">
            <div className="list">
              {!!contractWriteInfo.error ? (
                <div>{contractWriteInfo.error}</div>
              ) : (
                <ListOfWriteMethods 
                arrayOfMethods={contractWriteInfo.funcList}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ListOfWriteMethods({ arrayOfMethods }) {
  const [paramsState, setParamsState] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setParamsState(state => {
      const newState = { ...state, [name]: value };
      return newState;
    });
  }

  return (
    <div className={styles.writeMethodsMain}>
      {arrayOfMethods.map((writeMethod, index) => {
        return (
          <div
            key={`writeMethods-${index}`}
            style={{ width: "100%" }}
          >
          <CollapsibleMethodItem writeMethod={writeMethod} index={index} />
          </div>
        );
      })}
    </div>
  );
}

function CollapsibleMethodItem({ writeMethod, index }) {
  const [valueState, setValueState] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setValueState(value);
  }

  function toggleOpen() {
    setIsOpen(state => !state);
  }

  return (
    <div
      className={
        isOpen
          ? `${styles.writeMethodContainer} ${styles.writeMethodContainerOpen}`
          : `${styles.writeMethodContainer} ${styles.writeMethodContainerClosed}`
      }
      onClick={toggleOpen}
    >
      <div className={styles.writeMethodTitle}>
        <p>{writeMethod.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.writeMethodTitleIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className={styles.writeMethodBody}>
        {writeMethod.inputs.map((input, index2) => {
          return (
            <div
              className={styles.writeMethodBodyInput}
              key={`writeMethod-element-${index2}`}
            >
              <span className={styles.writeMethodBodyInputName}>
                {input.name}
              </span>
              <span className={styles.writeMethodBodyInputType}>
                <input
                  type="text"
                  className="over"
                  key={`writeMethod-${index2}`}
                  name={`${writeMethod.name}_${input.name}_${input.type}`}
                  placeholder={input.type}
                  value={valueState}
                  onChange={handleChange}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContractWrite;
