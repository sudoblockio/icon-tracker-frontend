import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { LoadingComponent } from "../../../../components";
import ButtonSet from "./ButtonSet";
import customStyles from "./ContractComponent.module.css";

function ContractComponent({ contract, contractReadWriteInfo, icxCall }) {
  const [params, setParams] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  // TODO: refactor code to make component use this state
  // instead of contractReadWriteInfo
  const [contractMethodsState, setContractMethodsState] = useState(
    createContractMethodsState(contractReadWriteInfo)
  );

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
  const { loading, funcList, funcOutputs, error } = contractReadWriteInfo;

  useEffect(() => {
    console.log("contractReadWriteInfo and contractWriteInfo");
    console.log(contractReadWriteInfo);
    // console.log(contractWriteInfo);
    console.log('contract method state');
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
              <ReadMethodItems
                funcList={funcList}
                funcOutputs={funcOutputs}
                params={params}
                handleChange={handleChange}
                handleClick={handleClick}
                address={address}
              />
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
  const result = {};
  funcList.forEach((func, index) => {
    const funcName = func["name"];
    const inputs = { ...func };
    const outputs = funcOutputs[index];
    result[funcName] = {
      inputs,
      outputs
    };
  });
  writeFuncList.forEach((func, index) => {
    const funcName = func["name"];
    const inputs = { ...func };
    const outputs = { error: "", valueArray: [] };
    result[funcName] = {
      inputs,
      outputs
    };
  });

  return result;
}

function WriteMethodItems({
  funcList,
  funcOutputs,
  params,
  handleChange,
  handleClick,
  address
}) {
  return (
    <ul className="list">
      {funcList.map((func, index) => {
        return (
          <div key={`MethodItem-${index}`}>
            <WriteMethodItem
              func={func}
              index={index}
              funcOutputs={funcOutputs}
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
          onClick={() => {
            handleClick(address, funcName, inputs, index);
          }}
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

function ReadMethodItems({
  funcList,
  funcOutputs,
  params,
  handleChange,
  handleClick,
  address
}) {
  return (
    <ul className="list">
      {funcList.map((func, index) => {
        return (
          <div key={`MethodItem-${index}`}>
            <ReadMethodItem
              func={func}
              index={index}
              funcOutputs={funcOutputs}
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
          onClick={() => {
            handleClick(address, funcName, inputs, index);
          }}
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

function InputItem({ funcName, inputs, params, handleChange, item, index }) {
  const name = item["name"];
  const type = item["type"];
  const inputName = `${funcName}_${name}_${type}`;
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

function Inputs({ funcName, inputs, params, handleChange }) {
  return inputs.map((item, index) => {
    return (
      <span key={`Inputs-${index}`}>
        <InputItem
          funcName={funcName}
          inputs={inputs}
          params={params}
          handleChange={handleChange}
          item={item}
          index={index}
        />
      </span>
    );
  });
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

function OutputResults({ func, outputs }) {
  const name = func["name"];
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

function Outputs({ func, outputs, index }) {
  const { valueArray, error } = outputs;
  if (error) {
    return (
      <li key={index}>
        {index + 1}. {func["name"]} > <span>{error}</span>
      </li>
    );
  } else {
    return (
      <li key={index}>
        {index + 1}. {func["name"]} >{" "}
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

export default ContractComponent;
