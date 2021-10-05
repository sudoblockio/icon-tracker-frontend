import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { getState } from '../../utils/utils'
import { trackerApiInstance } from '../api/restV3/config' 

const BLOCK_PREFIX = '/v1/blocks'

const BLOCK_LIST = 'BLOCK_LIST'
const BLOCK_INFO = 'BLOCK_INFO'
const BLOCK_TX_LIST = 'BLOCK_TX_LIST'
const BLOCK_TX_LIST_FULFILLED = 'BLOCK_TX_LIST_FULFILLED'
const BLOCK_TX_LIST_REJECTED = 'BLOCK_TX_LIST_REJECTED'

const getblockList = (payload) => ({
        type: BLOCK_LIST,
        payload
});

const getblockInfo = (payload) => ({
      type: BLOCK_INFO,
      payload
    });

const getblockTxList = (payload) => ({
    type: BLOCK_TX_LIST,
    payload
  });

export const blockList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try {
        const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload.limit));
        if (response.status === 200) {
            const data = response.data;
             dispatch(getblockList(data))
             return data
        } else {
            // handle error
        }
    
    }
    catch (e) {
        console.log(e, "e from the blockList")
    }
};

export const blockTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
    const response = await trackerApi.get(`/api/v1/transactions?block_number=${payload.number}`);
    console.log(response, "res from blockTxList")
    if (response.status === 200) {
        const data = response.data;
        console.log(data, "data from block tx list")
        dispatch(getblockTxList(data))
    }}
    catch (e) {
        console.log(e, "error from blockTxList")
    }
};

export const blockInfo = (payload) => async (dispatch) => {
    console.log(payload, "paylod")
    const trackerApi = await trackerApiInstance();
    try {
        // const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
        const response = await trackerApi.get(`/api${BLOCK_PREFIX}/${payload.number}`)
        console.log(response, "res from blockinfo")
        if (response.status === 200) {
            const data = response.data;
            dispatch(getblockInfo(data))
            console.log(data, "data from blockINfo")
            return data
    } else {
        // setError(error)
    }
}
    catch (e) {
        console.log(e, "error from blockInfo")
    }
};


const initialState = {
    blocks: INITIAL_STATE['ARR'],
    block: INITIAL_STATE['OBJ'],
    blockTx: INITIAL_STATE['ARR'],
  }

let newState;
const blocksReducer = (state = initialState, action) => {
    switch (action.type){
        case BLOCK_LIST: {
            newState = deepcopy(state)
            newState.blocks.data = action.payload
            return newState;
        }
        case BLOCK_INFO: {
            newState = deepcopy(state)
            newState.block.data = action.payload
            return newState
        }
        case BLOCK_TX_LIST: {
            newState = deepcopy(state)
            newState.blockTx.data = action.payload
            console.log(newState, "newstate block tx")
            return newState
        }
        default:
      return state;
    }
};

export default blocksReducer;