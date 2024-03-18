import { trackerApiInstance, walletApiInstance } from '../api/restV3/config'
import actionTypes from '../actionTypes/actionTypes'
import { randomUint32 } from '../../utils/utils'
import { getState, makeUrl, makeTokenUrl } from '../../utils/utils'
import { REDUX_STEP, INITIAL_STATE } from '../../utils/const'
import { prefixes } from '../../utils/const'
// *update paths in prefixes object to change app-wide.*

// ACTIONS

export function addressListAction(payload) {
    return {
        type: actionTypes.addressList,
        payload,
    }
}

export function addressInfoAction(payload) {
    return {
        type: actionTypes.addressInfo,
        payload,
    }
}

export function addressTxListAction(payload) {
    return {
        type: actionTypes.addressTxList,
        payload,
    }
}

export function addressInternalTxListAction(payload) {
    return {
        type: actionTypes.addressInternalTxList,
        payload,
    }
}

export function addressTokenTxListAction(payload) {
    return {
        type: actionTypes.addressTokenTxList,
        payload,
    }
}

export function addressDelegationListAction(payload) {
    return {
        type: actionTypes.addressDelegationList,
        payload,
    }
}

export function addressVotedListAction(payload) {
    return {
        type: actionTypes.addressVotedList,
        payload,
    }
}

export function addressRewardListAction(payload) {
    return {
        type: actionTypes.addressRewardList,
        payload,
    }
}

// API

const { ADDRESSES_PREFIX, TRANSACTIONS_PREFIX } = prefixes

export async function addressRewardList(payload) {
    console.log('hit this function')
    const trackerApi = await trackerApiInstance()

    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl(`/api/v1/governance/rewards/${payload.address}`, queryPayload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error, 'reward error')
                reject(error)
            })
    })
}

// export async function addressDelegationList(payload){
//   console.log(payload, "address delagation payload")
//   payload.address ? payload = payload.address : payload = payload
//   const trackerApi = await trackerApiInstance()
//   return new Promise((resolve, reject) => {
//     trackerApi.get(`/api/v1/governance/delegations/${payload}`)
//       .then(result => {
//         resolve(result)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }

export async function addressList(payload) {
    const trackerApi = await trackerApiInstance()
    console.log('API CALL', { payload })
    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl(`${ADDRESSES_PREFIX}`, queryPayload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressInfo(payload) {
    const trackerApi = await trackerApiInstance()
    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl(`${ADDRESSES_PREFIX}/details/${payload.address}`, queryPayload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressTokens(payload) {
    const trackerApi = await trackerApiInstance()

    return new Promise((resolve, reject) => {
        trackerApi
            .get(`${ADDRESSES_PREFIX}/token-addresses/${payload.address || payload}`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressTxList(payload) {
    const trackerApi = await trackerApiInstance()
    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl(`${TRANSACTIONS_PREFIX}/address/${payload.address}`, queryPayload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressTokenTxList(payload) {
    console.trace(payload, 'Each payload')
    const trackerApi = await trackerApiInstance()
    const queryPayload = { ...payload }
    delete queryPayload.address

    console.trace('API CALL')

    return new Promise((resolve, reject) => {
        trackerApi
            .get(
                makeTokenUrl(
                    `${TRANSACTIONS_PREFIX}/token-transfers/address/${payload.address}`,
                    queryPayload
                )
            )
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressInternalTxList(payload) {
    const trackerApi = await trackerApiInstance()

    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(
                makeUrl(
                    `${TRANSACTIONS_PREFIX}/internal/address/${payload.address || payload.prep}`,
                    queryPayload
                )
            )
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function addressVotedList(payload) {
    console.log(payload, 'vote payload')

    const trackerApi = await trackerApiInstance()

    const queryPayload = { ...payload }
    delete queryPayload.address

    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl(`/api/v1/governance/votes/${payload.address || payload}`, queryPayload))
            .then((result) => {
                console.log(result, 'what result')
                resolve(result)
            })
            .catch((error) => {
                console.log(error, 'What error')
                reject(error)
            })
    })
}

export async function addressDelegationList(address) {
    const walletApi = await walletApiInstance()
    return new Promise((resolve) => {
        const param = {
            jsonrpc: '2.0',
            method: 'icx_call',
            id: randomUint32(),
            params: {
                from: 'hx0000000000000000000000000000000000000000',
                to: 'cx0000000000000000000000000000000000000000',
                dataType: 'call',
                data: {
                    method: 'getDelegation',
                    params: {
                        address: address,
                    },
                },
            },
        }
        walletApi
            .post(`/api/v3`, JSON.stringify(param))
            .then((response) => {
                console.log(response, 'deleg response')
                resolve(response.data.result)
            })
            .catch((error) => {
                resolve({ error })
            })
    })
}

// REDUCER

const initialState = {
    addresses: INITIAL_STATE['ARR'],
    wallet: INITIAL_STATE['OBJ'],
    walletTx: INITIAL_STATE['ARR'],
    addressInternalTx: INITIAL_STATE['ARR'],
    walletTokenTx: INITIAL_STATE['ARR'],
    addressDelegation: INITIAL_STATE['ARR'],
    addressVoted: INITIAL_STATE['ARR'],
    addressReward: INITIAL_STATE['ARR'],
}

export function addressesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.addressList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'addresses')
        case actionTypes.addressListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addresses')
        case actionTypes.addressListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addresses')

        case actionTypes.addressInfo:
            return getState('OBJ', REDUX_STEP.READY, state, action, 'wallet')
        case actionTypes.addressInfoFulfilled:
            return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'wallet')
        case actionTypes.addressInfoRejected:
            return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'wallet')

        case actionTypes.addressTxList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'walletTx')
        case actionTypes.addressTxListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'walletTx')
        case actionTypes.addressTxListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'walletTx')

        case actionTypes.addressInternalTxList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'addressInternalTx')
        case actionTypes.addressInternalTxListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressInternalTx')
        case actionTypes.addressInternalTxListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressInternalTx')

        case actionTypes.addressTokenTxList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'walletTokenTx')
        case actionTypes.addressTokenTxListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'walletTokenTx')
        case actionTypes.addressTokenTxListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'walletTokenTx')

        case actionTypes.addressDelegationList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'addressDelegation')
        case actionTypes.addressDelegationListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressDelegation')
        case actionTypes.addressDelegationListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressDelegation')

        case actionTypes.addressVotedList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'addressVoted')
        case actionTypes.addressVotedListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressVoted')
        case actionTypes.addressVotedListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressVoted')

        case actionTypes.addressRewardList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'addressReward')
        case actionTypes.addressRewardListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressReward')
        case actionTypes.addressRewardListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressReward')

        default: {
            return state
        }
    }
}
