// rawTxMaker/api/governance.js
//
// Imports
import { scores, makeTxCallRPCObj } from "./helpers"

// Governance methods
/*
 *
 */
function voteNetworkProposal(proposalId, vote, prepAddress, nid) {
  return makeTxCallRPCObj(
    prepAddress,
    scores.mainnet.governance2,
    "voteProposal",
    {
      id: proposalId,
      vote: vote
    },
    nid
  );
};

/*
 *
 */
function approveNetworkProposal(proposalId, prepAddress, nid) {
  return voteNetworkProposal(proposalId, "0x1", prepAddress, nid);
};

/*
 *
 */
function rejectNetworkProposal(proposalId, prepAddress, nid) {
  return voteNetworkProposal(proposalId, "0x0", prepAddress, nid);
};

const governanceMethods= {
  voteNetworkProposal, 
  approveNetworkProposal,
  rejectNetworkProposal
}
export default governanceMethods;
