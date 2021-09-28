import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const TX_PREFIX = `/v1/transactions`


// previously src/redux/actionTypes/actionTypes.js
const TX_LIST = 'TX_LIST'
const TX_DETAIL = 'TX_DETAIL'

// previously src/redux/actions/transactionsActions.js
const getTxList = (payload) => ({
    type: TX_LIST, 
    payload
});

const getTxDetail = (payload) => ({
    type: TX_DETAIL,
    payload
})

// previously src/redux/api/restV3/transaction.js
// maybe go by HTTP status code instead of res.data
// "when there is an error and nothign loads res.data will still have stuff"
// try a refactor with status code instead of "if data exists"
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
    }
    catch (e) {
        // if no tracker api instance 
        console.log(e)
    }
}
// get old api data
// const OLD_ENDPOINT = `https://trackerdev.icon.foundation/v3/transaction/recentTx`
// const makeOldUrl  = (url, payload) => {
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
//         const res = await fetch(makeOldUrl(`${OLD_ENDPOINT}`, payload))
//         console.log(res, "old res")
//         // if 200
//         if (res.status === 200) {
//             const data = await res.json()
//             console.log(data, "this is data")
//             dispatch(getTxList(data.data))
//             return data
//         } else {
//             //setError(e)
//         }
//         // error
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

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
        default:
            return state;
    }
};

export default transactionsReducer;