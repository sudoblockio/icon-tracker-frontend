// rawTxMaker/api/custom.js
//
// Imports
import { makeTxCallRPCObj } from './helpers'

// Custom methods
/*
 *
 */
async function customMethod(from, to, methodName, methodParams, nid, value = null) {
  const RPCObj = await makeTxCallRPCObj(from, to, methodName, methodParams, nid, null, value)
  return RPCObj
}

export default customMethod
