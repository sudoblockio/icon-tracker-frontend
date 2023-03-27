// rawTxMaker/api/chain.js
//
// Imports
import { scores, makeTxCallRPCObj }  from "./helpers"

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
};

function setPrep(wallet, prepData, nid) {
  return makeTxCallRPCObj(
    wallet,
    scores.mainnet.governance,
    "setPRep",
    prepData,
    nid
  )
}
const chainMethods = {
  setBonderList,
  setPrep
}
export default chainMethods;
