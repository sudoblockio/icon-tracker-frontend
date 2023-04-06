import React from "react";
import BigNumber from "bignumber.js";

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
        return (
          <div key={`MethodItem-${methodName}-${index}`}>
            <ReadMethodItem2
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
  console.log("inputs");
  console.log(inputs);
  console.log(methodData);

  function handleButtonClick() {
    handleClick(address, methodName, inputs.inputs, index);
  }

  return isQuery ? (
    <>
      <li key="li0" className="input">
        <span className="label">
          {index + 1}. {methodName} >{" "}
        </span>
        <Inputs2
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
        <OutputTypes2 func={inputs} />
        {!isEmptyOutput(outputs) && (
          <OutputResults2
            methodName={methodName}
            func={inputs}
            outputs={outputs}
          />
        )}
      </li>
    </>
  ) : (
    <Outputs2
      key={index}
      methodName={methodName}
      func={inputs}
      outputs={outputs}
      index={index}
    />
  );
}

function Inputs2({ methodName, inputs, params, handleChange }) {
  return inputs.map((item, index) => {
    return (
      <span key={`Inputs-${methodName}-${index}`}>
        <InputItem2
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

function InputItem2({ methodName, params, handleChange, item, index }) {
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

function OutputTypes2({ func }) {
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

function OutputResults2({ methodName, func, outputs }) {
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

function Outputs2({ methodName, func, outputs, index }) {
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
      <span key={`Inputs-${funcName}-${index}`}>
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

const MiscComponents = {
  ReadMethodItems,
  ReadMethodItems2
};
export default MiscComponents;
