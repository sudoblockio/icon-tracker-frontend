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
    const { scoreAddress, indexed, data } = log

    // create parsed log object
    const parsedLog = {
        scoreAddress: scoreAddress,
        indexed: indexed,
        data: data,
        methodName: '',
        params: indexed.slice(1),
        paramsTypeFromLogIndex: indexed[0].split('(')[1].split(')')[0].split(','),
    }

    // create result object
    const result = {
        origin: scoreAddress,
        params: [],
    }

    // filter eventlog and save to parsedLog
    const onlyLogs = scoreApi.filter((each) => each.type === 'eventlog')
    parsedLog.onlylogAbi = onlyLogs

    // save method name to parsedLog and result
    parsedLog.methodName = indexed[0].split('(')[0]
    result.methodName = parsedLog.methodName

    // save params type from abi to parsedLog
    const methodInAbi = onlyLogs.filter((each) => each.name === parsedLog.methodName)
    if (methodInAbi.length > 0) {
        parsedLog.inputsFromAbi = methodInAbi[0].inputs
    } else {
        parsedLog.inputsFromAbi = []
    }

    let ii = 0
    // loop paramsTypeFromLogIndex
    for (let i = 0; i < parsedLog.paramsTypeFromLogIndex.length; i++) {
        // get param type, and default values for name and value
        const paramType = parsedLog.paramsTypeFromLogIndex[i]
        let paramName = 'null'
        let paramValue = 'null'

        // if abi is not empty. save name and value
        // There are cases where the abi is empty.
        if (parsedLog.inputsFromAbi != null) {
            if (parsedLog.inputsFromAbi[i] != null) {
                if (parsedLog.inputsFromAbi[i].name != null) {
                    paramName = parsedLog.inputsFromAbi[i].name
                }
            }

            // if params.length > i, save value, this is because the value is in the indexed array instead of the data array
            if (parsedLog.params.length > i) {
                paramValue = parsedLog.params[i] || 'null'
            } else {
                // if params.length <= i, save value from data array
                paramValue = data[ii] || 'null'
                ii++
            }
            // save to result
            result.params.push({
                name: paramName,
                type: paramType,
                value: paramValue,
            })
        }
    }

    // return parsed events
    return result
}

module.exports = {
    txEventParser,
}


/*
[
   {
      "transaction_hash":"0xc17c99380869978e2b52bc844cc1c7ba0fb92143f017a999ae95462aefac4a7e",
      "log_index":4,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83815608,
      "method":"TokenTransfer",
      "data":"[\"23537751931899922725 sICX minted to cx21e94c08c03daee80c25d8ee3ea22a20786ec231\"]",
      "indexed":"[\"TokenTransfer(Address,int,str)\",\"cx21e94c08c03daee80c25d8ee3ea22a20786ec231\",\"0x146a6e4ac7828c925\"]",
      "block_timestamp":1720269486306568
   },
   {
      "transaction_hash":"0xc17c99380869978e2b52bc844cc1c7ba0fb92143f017a999ae95462aefac4a7e",
      "log_index":2,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83815608,
      "method":"UnstakingUpdate",
      "data":"null",
      "indexed":"[\"UnstakingUpdate(int,int)\",\"0x4feecb8\",\"0x502f0ee\"]",
      "block_timestamp":1720269486306568
   },
   {
      "transaction_hash":"0x73b40d0ef090d6893c0d7d27f90b98aa19a5781ea9c1fd02537433986e1be0b9",
      "log_index":4,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83814893,
      "method":"TokenTransfer",
      "data":"[\"180276643003209000407 sICX minted to cx21e94c08c03daee80c25d8ee3ea22a20786ec231\"]",
      "indexed":"[\"TokenTransfer(Address,int,str)\",\"cx21e94c08c03daee80c25d8ee3ea22a20786ec231\",\"0x9c5d74baa322ea5d7\"]",
      "block_timestamp":1720268054591823
   },
   {
      "transaction_hash":"0x73b40d0ef090d6893c0d7d27f90b98aa19a5781ea9c1fd02537433986e1be0b9",
      "log_index":2,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83814893,
      "method":"UnstakingUpdate",
      "data":"null",
      "indexed":"[\"UnstakingUpdate(int,int)\",\"0x4fee9ed\",\"0x502f0ee\"]",
      "block_timestamp":1720268054591823
   },
   {
      "transaction_hash":"0x95648b30a36a76bd30a77741cfe3ca051b7e1575fcf1e94c5dc32f988d4c9667",
      "log_index":6,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83813003,
      "method":"TokenTransfer",
      "data":"[\"8491806019865550 sICX minted to cx21e94c08c03daee80c25d8ee3ea22a20786ec231\"]",
      "indexed":"[\"TokenTransfer(Address,int,str)\",\"cx21e94c08c03daee80c25d8ee3ea22a20786ec231\",\"0x1e2b40a950cbce\"]",
      "block_timestamp":1720264270871422
   },
   {
      "transaction_hash":"0x95648b30a36a76bd30a77741cfe3ca051b7e1575fcf1e94c5dc32f988d4c9667",
      "log_index":4,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83813003,
      "method":"UnstakingUpdate",
      "data":"null",
      "indexed":"[\"UnstakingUpdate(int,int)\",\"0x4fee28b\",\"0x502f0ee\"]",
      "block_timestamp":1720264270871422
   },
   {
      "transaction_hash":"0x697c03f1a5a5db4149db3c201cbf809ef46faf8efffc54221f672ae8665fe307",
      "log_index":4,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83812898,
      "method":"TokenTransfer",
      "data":"[\"181382610214635288449 sICX minted to cx66d4d90f5f113eba575bf793570135f9b10cece1\"]",
      "indexed":"[\"TokenTransfer(Address,int,str)\",\"cx66d4d90f5f113eba575bf793570135f9b10cece1\",\"0x9d5307afbe479b781\"]",
      "block_timestamp":1720264060877000
   },
   {
      "transaction_hash":"0x697c03f1a5a5db4149db3c201cbf809ef46faf8efffc54221f672ae8665fe307",
      "log_index":2,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83812898,
      "method":"UnstakingUpdate",
      "data":"null",
      "indexed":"[\"UnstakingUpdate(int,int)\",\"0x4fee222\",\"0x502f0ee\"]",
      "block_timestamp":1720264060877000
   },
   {
      "transaction_hash":"0xbbb564baa5fc93624a9a79ff4eda08c05f19757e62fd812f1217612c30ad98b3",
      "log_index":10,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83812565,
      "method":"UnstakeAmountTransfer",
      "data":"null",
      "indexed":"[\"UnstakeAmountTransfer(Address,int)\",\"cxdc30a0d3a1f131565c071272a20bc0b06fd4c17b\",\"0x111c173b0a3b3a49cfa\"]",
      "block_timestamp":1720263393307208
   },
   {
      "transaction_hash":"0xbbb564baa5fc93624a9a79ff4eda08c05f19757e62fd812f1217612c30ad98b3",
      "log_index":9,
      "address":"cx43e2eec79eb76293c298f2b17aec06097be606e0",
      "block_number":83812565,
      "method":"FundTransfer",
      "data":"[\"5049900811611489475834 ICX sent to cxdc30a0d3a1f131565c071272a20bc0b06fd4c17b.\"]",
      "indexed":"[\"FundTransfer(Address,int,str)\",\"cxdc30a0d3a1f131565c071272a20bc0b06fd4c17b\",\"0x111c173b0a3b3a49cfa\"]",
      "block_timestamp":1720263393307208
   }
]
*/