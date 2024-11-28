import { trackerApiInstance } from '../api/restV3/config'
import actionTypes from '../actionTypes/actionTypes'
import { getState, makeUrl } from '../../utils/utils'
import { REDUX_STEP, INITIAL_STATE } from '../../utils/const'


import { prefixes } from '../../utils/const'
import { getEventsByName, getParsedLog, getParsedLogs } from '../../libs/event-log-parser'
const { CONTRACTS_PREFIX, } = prefixes

// ACTIONS
export function transactionRecentTxAction(payload) {
    return {
        type: actionTypes.transactionRecentTx,
        payload,
    }
}

export function transactionTxDetailAction(payload) {
    console.log(payload, 'payload=======>')
    return {
        type: actionTypes.transactionTxDetail,
        payload,
    }
}

export function transactionEventLogListAction(payload) {
    return {
        type: actionTypes.transactionEventLogList,
        payload,
    }
}

export function transactionInternalTxListAction(payload) {
    return {
        type: actionTypes.transactionInternalTxList,
        payload,
    }
}

//   API

export async function transactionRecentTx(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl('/api/v1/transactions', payload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function transactionTxDetail(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(`/api/v1/transactions/details/${payload.txHash}`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function transactionInternalTxList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        //  TODO: Check this later!
        trackerApi
            .get(makeUrl(`/api/v1/transactions/internal/${payload}`))

            .then((result) => {
                console.log(result, 'api result tx int')
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}



export async function transactionEventLogList(payload) {
    const trackerApi = await trackerApiInstance()



    return new Promise((resolve, reject) => {
        trackerApi
            .get(`/api/v1/logs?transaction_hash=${payload.txHash}`)
            .then(async (result) => {
                console.log("result b4", result)
                const contractData = await trackerApi.get(`${CONTRACTS_PREFIX}/${result.data[0].address}`)
                const abi = contractData.data.abi;
                const eventsByName = getEventsByName(abi);
                result.data.forEach(log => {
                    log.parsedLog = getParsedLog(log, eventsByName)
                })
                console.log("result after", result)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// REDUCER
const initialState = {
    transaction: INITIAL_STATE['OBJ'],
    recentTx: INITIAL_STATE['ARR'],
    transactionEvents: INITIAL_STATE['ARR'],
    transactionInternalTx: INITIAL_STATE['ARR'],
}

export function transactionsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.transactionTxDetail:
            return getState('OBJ', REDUX_STEP.READY, state, action, 'transaction')
        case actionTypes.transactionTxDetailFulfilled:
            return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'transaction')
        case actionTypes.transactionTxDetailRejected:
            return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'transaction')

        case actionTypes.transactionRecentTx: {
            return getState('ARR', REDUX_STEP.READY, state, action, 'recentTx')
        }
        case actionTypes.transactionRecentTxFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'recentTx')
        case actionTypes.transactionRecentTxRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'recentTx')

        case actionTypes.transactionEventLogList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'transactionEvents')
        case actionTypes.transactionEventLogListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'transactionEvents')
        case actionTypes.transactionEventLogListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'transactionEvents')

        case actionTypes.transactionInternalTxList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'transactionInternalTx')
        case actionTypes.transactionInternalTxListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'transactionInternalTx')
        case actionTypes.transactionInternalTxListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'transactionInternalTx')

        default: {
            return state
        }
    }
}
