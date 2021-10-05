import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const TX_PREFIX = `/v1/transactions`


// previously src/redux/actionTypes/actionTypes.js
const TX_LIST = 'TX_LIST'
const TX_DETAIL = 'TX_DETAIL'
const TX_INT_LIST = 'TX_INT_LIST'

// previously src/redux/actions/transactionsActions.js
const getTxList = (payload) => ({
    type: TX_LIST, 
    payload
});

const getTxIntList = (payload) => ({
    type: TX_INT_LIST, 
    payload
})

const getTxDetail = (payload) => ({
    type: TX_DETAIL,
    payload
})


export const transactionInternalTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    console.log(payload, "int tx list payload")
    try {
        const res = await trackerApi.get(`/api/v1/transactions/internal/${payload.txHash}`)
        console.log(res, "int tx list res")
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
            dispatch(getTxList(data))
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
        const res = await trackerApi.get(makeUrl(`${TX_PREFIX}/${payload.txHash}`, payload))
        if (res.status === 200) {
            const data = res.data
            dispatch(getTxDetail(data))
            return data
        } else {
            //setError(e)
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
        case TX_LIST: {
            newState = deepcopy(state)
            newState.recentTx.data = action.payload
            return newState
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


