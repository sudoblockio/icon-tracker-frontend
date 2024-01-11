// rawTxMaker/api/chain.js
//
// Imports
import { scores, makeTxCallRPCObj } from "./helpers";

// Chain methods
/*
 *
 */
function setBonderList(prepAddress, arrayOfBonderAddresses, nid) {
  return makeTxCallRPCObj(
    prepAddress,
    scores.mainnet.governance,
    "setBonderList",
    {
      bonderList: [...arrayOfBonderAddresses]
    },
    nid
  );
}

function setPrep(wallet, prepData, nid) {
  return makeTxCallRPCObj(
    wallet,
    scores.mainnet.governance,
    "setPRep",
    prepData,
    nid
  );
}

function setBond(wallet, arrayOfBonds, nid) {
  return makeTxCallRPCObj(
    wallet,
    scores.mainnet.governance,
    "setBond",
    {
      bonds: [...arrayOfBonds]
    },
    nid
  );
}

function initCommissionRate(wallet, inputs, nid) {
  return makeTxCallRPCObj(
    wallet,
    scores.mainnet.governance,
    "initCommissionRate",
    inputs,
    nid
  );
}

function setCommissionRate(wallet, inputs, nid) {
  return makeTxCallRPCObj(
    wallet,
    scores.mainnet.governance,
    "setCommissionRate",
    inputs,
    nid
  );
}

function requestUnjail(prepAddress, nid) {
  return makeTxCallRPCObj(
    prepAddress,
    scores.mainnet.governance,
    "requestUnjail",
    null,
    nid
  );
}

const chainMethods = {
  setBonderList,
  setPrep,
  setBond,
  setCommissionRate,
  initCommissionRate,
  requestUnjail
};

export default chainMethods;
