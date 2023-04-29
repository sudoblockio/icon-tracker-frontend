export function makeParams(params, funcName, inputs) {
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

export function createContractMethodsState(contractReadWriteInfo) {
  //
  const {
    funcList,
    funcOutputs,
    writeFuncList,
    writeFuncOutputs
  } = contractReadWriteInfo;

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

    const outputs = writeFuncOutputs[index];
    result[funcName] = {
      inputs,
      outputs
    };
  });

  return result;
}
