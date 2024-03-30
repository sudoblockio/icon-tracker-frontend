// rawTxMaker/api/chain.js
//
// Imports
import { scores, makeTxCallRPCObj } from './helpers'

// Chain methods
/*
 *
 */
async function setBonderList(prepAddress, arrayOfBonderAddresses, nid) {
    return await makeTxCallRPCObj(
        prepAddress,
        scores.mainnet.governance,
        'setBonderList',
        {
            bonderList: [...arrayOfBonderAddresses],
        },
        nid
    )
}

async function setPrep(wallet, prepData, nid) {
    return await makeTxCallRPCObj(wallet, scores.mainnet.governance, 'setPRep', prepData, nid)
}

async function setBond(wallet, arrayOfBonds, nid) {
    return await makeTxCallRPCObj(
        wallet,
        scores.mainnet.governance,
        'setBond',
        {
            bonds: [...arrayOfBonds],
        },
        nid
    )
}

async function initCommissionRate(wallet, inputs, nid) {
    return await makeTxCallRPCObj(
        wallet,
        scores.mainnet.governance,
        'initCommissionRate',
        inputs,
        nid
    )
}

async function setCommissionRate(wallet, inputs, nid) {
    return await makeTxCallRPCObj(
        wallet,
        scores.mainnet.governance,
        'setCommissionRate',
        inputs,
        nid
    )
}

async function requestUnjail(prepAddress, nid) {
    return await makeTxCallRPCObj(
        prepAddress,
        scores.mainnet.governance,
        'requestUnjail',
        null,
        nid
    )
}

const chainMethods = {
    setBonderList,
    setPrep,
    setBond,
    setCommissionRate,
    initCommissionRate,
    requestUnjail,
}

export default chainMethods
