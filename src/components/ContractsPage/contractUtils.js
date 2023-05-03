import { icxGetScore, icxCall } from "../../redux/api/restV3/icx";

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

export async function localReadContractInformationFunc(score, cxAddress) {
  const readOnlyFunc = (score || []).filter(
    func => func["type"] == "function" && func["readonly"] === "0x1"
  );
  const writeFunc = (score || []).filter(
    func => func["type"] == "function" && func["readonly"] !== "0x0"
  );
  const funcList = [...readOnlyFunc];
  const writeFuncList = [...writeFunc];
  const writeFuncOutputs = Array.from(writeFuncList, () => {
    return { valueArray: [], error: "", state: 0 };
  });
  const _funcOutputs = [];
  for (let i = 0; i < readOnlyFunc.length; i++) {
    const func = readOnlyFunc[i];
    if (func["inputs"].length === 0) {
      //TODO: make icx call here
      const a = await icxCall({
        from: "hx23ada4a4b444acf8706a6f50bbc9149be1781e13",
        to: cxAddress,
        dataType: "call",
        data: {
          method: func["name"]
        }
      });
      _funcOutputs.push(a);
    } else {
      _funcOutputs.push("");
    }
  } 

  const funcOutputs = [];
  _funcOutputs.forEach(output => {
    if (output === "") {
      funcOutputs.push({
        valueArray: [],
        error: "",
        state: 0
      });
    } else if (output.status === 200) {
      const { result } = output.data;
      const valueArray = [result];
      funcOutputs.push({
        valueArray,
        error: "",
        state: 1
      });
    } else {
      const { message } = output.error;
      funcOutputs.push({
        valueArray: [],
        error: message,
        state: 1
      });
    }
  });

  const result = {
    funcList,
    funcOutputs,
    writeFuncList,
    writeFuncOutputs
  }

  return result;
}
