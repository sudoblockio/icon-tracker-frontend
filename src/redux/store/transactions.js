import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const TX_LIST = 'TX_LIST'
const TX_DETAIL = 'TX_DETAIL'

const getTxList = (payload) => ({
    type: TX_LIST, 
    payload
});

const getTxDetail = (payload) => ({
    type: TX_DETAIL,
    payload
})

export const txList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try {
        const res = await trackerApi.get(makeUrl(`/v1/transactions`, payload))
        if (res.data) {
            const data = res.data
            dispatch(getTxList(data))
            return data
        }
    }
    catch (e) {
        console.log(e, "error message from the store")
    }
}

export const transactionTxDetail = (payload) => async (dispatch)=> {
    const trackerApi = await trackerApiInstance()
    try {
        const res = await trackerApi.get(`/api/v1/transactions/${payload.txHash}`)
        if (res.data) {
            const data = res.data
            dispatch(getTxDetail(data))
            return data
        }
    }
    catch (e) {
        console.log(e, "error from transactionTxDetail")
    }
}



const initialState = {
    transaction: INITIAL_STATE['OBJ'],
    recentTx: INITIAL_STATE['ARR'],
    transactionEvents: INITIAL_STATE['ARR'],
    transactionInternalTx: INITIAL_STATE['ARR'],
  }

let newState;
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