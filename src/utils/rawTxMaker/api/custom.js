// rawTxMaker/api/custom.js
//
// Imports
import {  makeTxCallRPCObj }  from "./helpers"

// Custom methods
/*
 *
 */
function customMethod(from, to, methodName, methodParams, nid) {
  return makeTxCallRPCObj(
    from,
    to,
    methodName,
    methodParams,
    nid
  )
}

export default customMethod;
