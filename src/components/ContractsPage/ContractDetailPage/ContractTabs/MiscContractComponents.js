import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import styles from "./MiscContractComponents.module.css";

function ReadMethodItems({
  methods,
  params,
  handleChange,
  handleClick,
  address
}) {
  return (
    <ul className="list">
      {methods.readOnlyMethodsNameArray.map((methodName, index) => {
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <ReadMethodItem
              methodName={methodName}
              methodData={methods[methodName]}
              index={index}
              params={params}
              handleChange={handleChange}
              handleClick={handleClick}
              address={address}
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
  address
}) {
  return (
    <ul className="list">
      {methods.writeMethodsNameArray.map((methodName, index) => {
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <ReadMethodItem
              methodName={methodName}
              methodData={methods[methodName]}
              index={index}
              params={params}
              handleChange={handleChange}
              handleClick={handleClick}
              address={address}
            />
          </div>
        );
      })}
    </ul>
  );
}

function ReadMethodItem({
  methodName,
  methodData,
  index,
  params,
  handleChange,
  handleClick,
  address
}) {
  const outputs = methodData.outputs;
  const inputs = methodData.inputs;
  const isQuery = inputs.inputs.length > 0;

  function handleButtonClick() {
    handleClick(address, methodName, inputs.inputs, index);
  }

  return isQuery ? (
    <>
      <li key="li0" className="input">
        <span className="label">
          {index + 1}. {methodName} >{" "}
        </span>
        <Inputs
          methodName={methodName}
          inputs={inputs.inputs}
          params={params}
          handleChange={handleChange}
          methodName={methodName}
        />
        <button
          key="button"
          className="btn-type-query"
          onClick={handleButtonClick}
        >
          Query
        </button>
      </li>
      ,
      <li key="li1" className="result">
        <OutputTypes func={inputs} />
        {!isEmptyOutput(outputs) && (
          <OutputResults
            methodName={methodName}
            func={inputs}
            outputs={outputs}
          />
        )}
      </li>
    </>
  ) : (
    <Outputs
      key={index}
      methodName={methodName}
      func={inputs}
      outputs={outputs}
      index={index}
    />
  );
}

function Inputs({ methodName, inputs, params, handleChange }) {
  return inputs.map((item, index) => {
    return (
      <span key={`Inputs-${methodName}-${index}`}>
        <InputItem
          methodName={methodName}
          params={params}
          handleChange={handleChange}
          item={item}
          index={index}
        />
      </span>
    );
  });
}

function InputItem({ methodName, params, handleChange, item, index }) {
  const name = item["name"];
  const type = item["type"];
  const inputName = `${methodName}_${name}_${type}`;
  const placeholder = `${name} (${type})`;
  const value = params[inputName] || "";
  return (
    <input
      type="text"
      className="over"
      key={index}
      name={inputName}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

function OutputTypes({ func }) {
  const list = func["outputs"];
  return list.map((output, index) => {
    const type = output["type"];
    return (
      <p key={index}>
        ┗<em key={index}>{type}</em>
      </p>
    );
  });
}

function OutputResults({ methodName, func, outputs }) {
  const name = methodName;
  const { valueArray, error } = outputs;
  return (
    <div>
      <p>[ {name} method response ]</p>
      {error ? (
        <p className="red">>> {error}</p>
      ) : (
        valueArray.map((value, i) => {
          const outType = func["outputs"][i]["type"];
          const outValue = getOutValue(outType, value);
          return (
            <p key={i}>
              >><em>{outType}</em>: {outValue}
            </p>
          );
        })
      )}
    </div>
  );
}

function Outputs({ methodName, func, outputs, index }) {
  const { valueArray, error } = outputs;
  if (error) {
    return (
      <li key={index}>
        {index + 1}. {methodName} > <span>{error}</span>
      </li>
    );
  } else {
    return (
      <li key={index}>
        {index + 1}. {methodName} >{" "}
        {valueArray.map((value, i) => {
          const outType = func["outputs"][i]["type"];
          const outValue = getOutValue(outType, value);
          return [
            <span key="span">{outValue}</span>,
            <em key="em">{outType}</em>
          ];
        })}
      </li>
    );
  }
}

function isEmptyOutput(outputs) {
  if (!outputs) {
    return true;
  } else {
    const { valueArray, error } = outputs;
    return valueArray.length === 0 && !error;
  }
}

function getOutValue(type, value) {
  switch (type) {
    case "int":
      return new BigNumber(value).toString(10);
    case "str":
      return value;
    default:
      return JSON.stringify(value);
  }
}

// function WriteMethodItems({
//   funcList,
//   funcOutputs,
//   params,
//   handleChange,
//   handleClick,
//   address
// }) {
//   return (
//     <ul className="list">
//       {funcList.map((func, index) => {
//         return (
//           <div key={`MethodItem-${index}`}>
//             <WriteMethodItem
//               func={func}
//               index={index}
//               funcOutputs={funcOutputs}
//               params={params}
//               handleChange={handleChange}
//               handleClick={handleClick}
//               address={address}
//             />
//           </div>
//         );
//       })}
//     </ul>
//   );
// }

function WriteMethodItem({
  func,
  index,
  funcOutputs,
  params,
  handleChange,
  handleClick,
  address
}) {
  const outputs = funcOutputs[index];
  const inputs = func["inputs"];
  const isQuery = inputs.length > 0;
  const funcName = func["name"];

  function handleButtonClick() {
    handleClick(address, funcName, inputs, index);
  }
  return isQuery ? (
    <>
      <li key="li0" className="input">
        <span className="label">
          {index + 1}. {funcName} >{" "}
        </span>
        <Inputs
          inputs={inputs}
          params={params}
          handleChange={handleChange}
          funcName={funcName}
        />
        <button
          key="button"
          className="btn-type-query"
          onClick={handleButtonClick}
        >
          Query
        </button>
      </li>
      ,
      <li key="li1" className="result">
        <OutputTypes func={func} />
        {!isEmptyOutput(outputs) && (
          <OutputResults func={func} outputs={outputs} />
        )}
      </li>
    </>
  ) : (
    <Outputs key={index} func={func} outputs={outputs} index={index} />
  );
}
// function ContractWrite({ contract, contractWriteInfo }) {
//   console.log('contractWriteInfo');
//   console.log(contractWriteInfo);
//   const [paramsState, setParamsState] = useState({});
//   const { data } = contract;
//   const { address: address } = data;
//   const loading = contractWriteInfo != null ? contractWriteInfo.loading : true;

//   return (
//     <div className="contents">
//       <div className="code-box read">
//         <div className="title-group">
//           <span className="title">Write contract information</span>
//         </div>
//         {loading ? (
//           <LoadingComponent height="322px" />
//         ) : (
//           <div className="scroll">
//             <div className="list">
//               {!!contractWriteInfo.error ? (
//                 <div>{contractWriteInfo.error}</div>
//               ) : (
//                 <ListOfWriteMethods
//                 arrayOfMethods={contractWriteInfo.funcList}
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ListOfWriteMethods({ arrayOfMethods }) {
//   const [paramsState, setParamsState] = useState({});
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setParamsState(state => {
//       const newState = { ...state, [name]: value };
//       return newState;
//     });
//   }

//   return (
//     <div className={styles.writeMethodsMain}>
//       {arrayOfMethods.map((writeMethod, index) => {
//         return (
//           <div
//             key={`writeMethods-${index}`}
//             style={{ width: "100%" }}
//           >
//           <CollapsibleMethodItem writeMethod={writeMethod} index={index} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

function CollapsibleMethodItem({
  methodInput,
  methodName,
  methodOutput,
  index
}) {
  const [valueState, setValueState] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const outputType =
    methodInput.readonly != null && methodInput.readonly === "0x1"
      ? methodInput.outputs[0].type
      : "";
  // const outputType = methodInput.readonly != null && methodInput.readonly === "0x1" ? "foo" : "bar";
  const parsedMethodOutput =
    methodInput.readonly != null && methodInput.readonly === "0x1"
      ? JSON.stringify(methodOutput.valueArray[0])
      : "";

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
    >
      <div className={styles.writeMethodTitle} onClick={toggleOpen}>
        <div className={styles.writeMethodTitleLeft}>
          <span>{index + 1}.</span> <span>{methodName}</span>{" "}
          <span>
            <em>{outputType}</em>
          </span>{" "}
          <span>{parsedMethodOutput}</span>
        </div>
        <div className={styles.writeMethodTitleLeft}>
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
      </div>
      {methodInput.inputs.length > 0 && (
        <div className={styles.writeMethodBody}>
          {methodInput.inputs.map((input, index2) => {
            return (
              <div
                className={styles.writeMethodBodyInput}
                key={`writeMethod-element-${index2}`}
              >
                <div className={styles.writeMethodBodyInputName}>
                  {methodName}
                </div>
                <div className={styles.writeMethodBodyInputType}>
                  <input
                    type="text"
                    className="over"
                    key={`writeMethod-${index2}`}
                    name={`${methodName}_${input.name}_${input.type}`}
                    placeholder={`${input.name} ${input.type}`}
                    value={valueState}
                    onChange={handleChange}
                  />
                </div>
              </div>
            );
          })}
          <div className={styles.methodInputButtonContainer}>
            <button
              className={styles.methodInputButton}>Query</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReadMethodItems2({
  methods,
  params,
  handleChange,
  handleClick,
  address
}) {
  return (
    <ul className="list">
      {methods.readOnlyMethodsNameArray.map((methodName, index) => {
        console.log("methods[methodName]");
        console.log(methods[methodName]);
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <CollapsibleMethodItem
              methodInput={methods[methodName].inputs}
              methodName={methodName}
              methodOutput={methods[methodName].outputs}
              index={index}
            />
          </div>
        );
      })}
    </ul>
  );
}

function ReadMethodItem2({
  methodName,
  methodData,
  index,
  params,
  handleChange,
  handleClick,
  address
}) {
  const outputs = methodData.outputs;
  const inputs = methodData.inputs;
  const isQuery = inputs.inputs.length > 0;

  function handleButtonClick() {
    handleClick(address, methodName, inputs.inputs, index);
  }

  return isQuery ? (
    <>
      <li key="li0" className="input">
        <span className="label">
          {index + 1}. {methodName} >{" "}
        </span>
        <Inputs
          methodName={methodName}
          inputs={inputs.inputs}
          params={params}
          handleChange={handleChange}
          methodName={methodName}
        />
        <button
          key="button"
          className="btn-type-query"
          onClick={handleButtonClick}
        >
          Query
        </button>
      </li>
      ,
      <li key="li1" className="result">
        <OutputTypes func={inputs} />
        {!isEmptyOutput(outputs) && (
          <OutputResults
            methodName={methodName}
            func={inputs}
            outputs={outputs}
          />
        )}
      </li>
    </>
  ) : (
    <Outputs
      key={index}
      methodName={methodName}
      func={inputs}
      outputs={outputs}
      index={index}
    />
  );
}

const MiscComponents = {
  ReadMethodItems,
  ReadMethodItems2,
  WriteMethodItems,
  CollapsibleMethodItem
};

export default MiscComponents;
