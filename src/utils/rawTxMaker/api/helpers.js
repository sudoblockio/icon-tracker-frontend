// rawTxMaker/api/helpers.js
//
// Imports
import { icxGetStepLimitEstimate } from '../../../redux/api/restV3/icx'
import scores from '../scores'
// import {} from "

// General Functions
/*
 *
 */
function makeJSONRPCRequestObj(method) {
  return {
    jsonrpc: '2.0',
    method: method,
    id: Math.ceil(Math.random() * 1000),
  }
}

/*
 *
 */
async function makeTxCallRPCObj(
  from,
  to,
  method,
  paramsObj = null,
  nid,
  stepLimit = 2000000,
  value = null
) {
  const params = {
    from: from,
    to: to,
    stepLimit: decimalToHex(stepLimit),
    nid: decimalToHex(nid),
    nonce: decimalToHex(Number(1)),
    version: decimalToHex(Number(3)),
    timestamp: decimalToHex(new Date().getTime() * 1000),
    dataType: 'call',
    data: {
      method: method,
    },
  }

  if (paramsObj != null) {
    params['data']['params'] = paramsObj
  }
  if (value != null && typeof value === 'number') {
    params['value'] = decimalToHex(value * 10 ** 18)
  }

  const estimateStepLimit = await icxGetStepLimitEstimate(params)
  params.stepLimit = decimalToHex(estimateStepLimit)

  let txObj = makeJSONRPCRequestObj('icx_sendTransaction')
  txObj['params'] = params
  return txObj
}

/*
 *
 */
function hexToDecimal(hex) {
  return parseInt(hex, 16)
}

/*
 *
 */
function decimalToHex(number) {
  return '0x' + number.toString(16)
}

/*
 *
 */
function fromHexInLoop(loopInHex) {
  let loopInBase2 = hexToDecimal(loopInHex)
  return loopInBase2 / 10 ** 18
}

export {
  makeJSONRPCRequestObj,
  makeTxCallRPCObj,
  hexToDecimal,
  decimalToHex,
  fromHexInLoop,
  scores,
}
