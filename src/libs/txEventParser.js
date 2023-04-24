/*
 * This function parses the event log into a more readable format.
 * @function txEventParser
 * @param {Object} log - log object
 * @param {Array} scoreApi - abi array
 * @return {Object} parsedLog - parsed log object
 * @example
 * const parsedLog = txEventParser(log, scoreApi);
 * console.log(parsedLog);
 * {
 * ...
 *  result: {
 *    origin: "cx1212...",
 *    methodName: "Transfer",
 *    params: [
 *      {
 *        name: "from",
 *        type: "address",
 *        value: "hx000000.."
 *      },
 *      {
 *      name: "to",
 *      type: "address",
 *      value: "hx000000.."
 *      },
 *      {
 *      name: "value",
 *      type: "int",
 *      value: "10000000
 *      }
 *    ]
 *  }
 * }
 */

function txEventParser(log, scoreApi) {
  // get log data
  const { scoreAddress, indexed, data } = log;

  // create parsed log object
  const parsedLog = {
    scoreAddress: scoreAddress,
    indexed: indexed,
    data: data,
    methodName: "",
    params: indexed.slice(1),
    paramsTypeFromLogIndex: indexed[0]
      .split("(")[1]
      .split(")")[0]
      .split(",")
  };

  // create result object
  const result = {
    origin: scoreAddress,
    params: []
  };

  // filter eventlog and save to parsedLog
  const onlyLogs = scoreApi.filter(each => each.type === "eventlog");
  parsedLog.onlylogAbi = onlyLogs;

  // save method name to parsedLog and result
  parsedLog.methodName = indexed[0].split("(")[0];
  result.methodName = parsedLog.methodName;

  // save params type from abi to parsedLog
  const methodInAbi = onlyLogs.filter(
    each => each.name === parsedLog.methodName
  );
  if (methodInAbi.length > 0) {
    parsedLog.inputsFromAbi = methodInAbi[0].inputs;
  } else {
    parsedLog.inputsFromAbi = [];
  }

  let ii = 0;
  // loop paramsTypeFromLogIndex
  for (let i = 0; i < parsedLog.paramsTypeFromLogIndex.length; i++) {
    // get param type, and default values for name and value
    const paramType = parsedLog.paramsTypeFromLogIndex[i];
    let paramName = "null";
    let paramValue = "null";

    // if abi is not empty. save name and value
    // There are cases where the abi is empty.
    if (parsedLog.inputsFromAbi != null) {
      if (parsedLog.inputsFromAbi[i] != null) {
        if (parsedLog.inputsFromAbi[i].name != null) {
          paramName = parsedLog.inputsFromAbi[i].name;
        }
      }

      // if params.length > i, save value, this is because the value is in the indexed array instead of the data array
      if (parsedLog.params.length > i) {
        paramValue = parsedLog.params[i] || "null";
      } else {
        // if params.length <= i, save value from data array
        paramValue = data[ii] || "null";
        ii++;
      }
      // save to result
      result.params.push({
        name: paramName,
        type: paramType,
        value: paramValue
      });
    }
  }

  // return parsed events
  return result;
}

module.exports = {
  txEventParser
};

