import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const TX_PREFIX = `/v1/transactions`

export const TRANSACTION_RECENT_TX = 'TRANSACTION_RECENT_TX'
export const TRANSACTION_RECENT_TX_FULFILLED = 'TRANSACTION_RECENT_TX_FULFILLED'
export const TRANSACTION_RECENT_TX_REJECTED = 'TRANSACTION_RECENT_TX_REJECTED'

// previously src/redux/actionTypes/actionTypes.js
export const TX_LIST = 'TX_LIST'
export const TX_DETAIL = 'TX_DETAIL'
export const TX_INT_LIST = 'TX_INT_LIST'

// previously src/redux/actions/transactionsActions.js
export const transactionRecentTx = (payload) => ({
    type: TRANSACTION_RECENT_TX, 
    payload
});

export const getTxIntList = (payload) => ({
    type: TX_INT_LIST, 
    payload
})

export const getTxDetail = (payload) => ({
    type: TX_DETAIL,
    payload
})



export const transactionInternalTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()

    try {
        const res = await trackerApi.get(`/api/v1/transactions/internal/${payload.txHash}`)

        if (res.status === 200) {
            const data = res.data
            dispatch(getTxIntList(data))
            return data
        } else {
            // handle error
        }
    } catch (e){
        console.log(e, "error from tx int list")
    }
}

export const txList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try {
        const res = await trackerApi.get(makeUrl(`${TX_PREFIX}`, payload))
        // if 200
        if (res.status === 200) {
            const data = res.data
            dispatch(transactionRecentTx(data))
            return data
        } else {
            //setError(e)
            // handle error from get
        }
        // error
    } catch (e) {
        // if no tracker api url
        console.log(e)
    }
}


// ::
// :: ripcord demo
// ::
// const V3_ENDPOINT = `https://trackerdev.icon.foundation/v3/transaction/recentTx`
// const makeV3Url  = (url, payload) => {
//     if (!payload) {
//         return url
//     }
//     let result = url
//     Object.keys(payload).forEach((key, index) => {
//         result += `${index === 0 ? '?' : '&'}${key}=${payload[key]}`
//     })
//     return result
// }
// export const txList = (payload) => async (dispatch) => {
//     try {
//         const res = await fetch(makeV3Url(`${V3_ENDPOINT}`, payload))
//         if (res.status === 200) {
//             const data = await res.json()
//             dispatch(getTxList(data.data))
//             return data
//         } else {
//             // 204 ? : 
//             //setError(e)
//         }
//         // error
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
// ::
// ::
// ::

export const transactionTxDetail = (payload) => async (dispatch)=> {
    const trackerApi = await trackerApiInstance()
    try {
        const res = await trackerApi.get(`/api/v1/transactions/details/${payload.txHash}`)
        if (res.status === 200) {
            const data = res.data
            dispatch(getTxDetail(data))
            return data
        } else {
            //setError(e)
            console.log(res, "yellow")
        }
    }
    catch (e) {
        console.log(e)
    }
}





const initialState = {
    transaction: INITIAL_STATE['OBJ'],
    recentTx: INITIAL_STATE['ARR'],
    transactionEvents: INITIAL_STATE['ARR'],
    transactionInternalTx: INITIAL_STATE['ARR'],
  }

let newState;
// previously src/redux/reducers/transactionsReducer.js
const transactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TRANSACTION_RECENT_TX: {
            newState = deepcopy(state)
            newState.recentTx.data = action.payload
            return getState('ARR', REDUX_STEP.READY, newState, action, 'recentTx')
        }

        case TRANSACTION_RECENT_TX_FULFILLED: {
            return getState('ARR', REDUX_STEP.FULFILLED, newState, action, 'recentTx')
        }
        case TX_DETAIL: {
            newState = deepcopy(state)
            newState.transaction.data = action.payload
            return newState
        }
        case TX_INT_LIST: {
            newState = deepcopy(state)
            newState.transactionInternalTx.data = action.payload
            return newState 
        }
        default:
            return state;
    }
};

export default transactionsReducer;


