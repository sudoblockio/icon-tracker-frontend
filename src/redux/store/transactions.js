import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const TX_LIST = 'TX_LIST'
// transactionRecentTx: 'TRANSACTION_RECENT_TX'

const getTxList = (payload) => ({
    type: TX_LIST, 
    payload
});

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

const initialState = {
    transaction: ['OBJ'],
    recentTx: ['ARR'],
    transactionEvents: ['ARR'],
    transactionInternalTx: ['ARR'],
  }

let newState;
const transactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TX_LIST: {
            newState = deepcopy(state)
            newState.recentTx = action.payload
            return newState
        }
        default:
            return state;
    }
};

export default transactionsReducer;