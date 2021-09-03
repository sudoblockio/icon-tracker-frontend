import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config' 

const BLOCK_PREFIX = '/v1/blocks'

const BLOCK_LIST = 'BLOCK_LIST'
const BLOCK_INFO = 'BLOCK_INFO'
const BLOCK_TX_LIST = 'BLOCK_TX_LIST'

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
    const search = payload
    search.limit = search.count
    delete search.count;
    delete search.page;

    const trackerApi = await trackerApiInstance()
    try {
        const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
        if (response.data) {
            const data = response.data;
             dispatch(getblockList(data))
             return data
        }}
    catch (e) {
        console.log(e, "e from the store")
    }
}

export const blockInfo = (payload) => async (dispatch) => {
    console.log(payload, "payload from info")
    const trackerApi = await trackerApiInstance();
    try {
        const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
        console.log(response, "response from blockinfo")
        if (response.ok) {
            console.log(response, "response from blockinfo")
            const data = response.data;
            console.log(data, "more data")
            dispatch(getblockInfo(data))
            return data
    }}
    catch (e) {
        console.log(e, "error from RHEANNONE")
    }
};

export const blockTxList = (payload) => async (dispatch) => {
    console.log(payload, "payload from blockinfo")
    const trackerApi = await trackerApiInstance();
    const response = trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
    if (response.ok) {
        const data = await response.data;
        dispatch(getblockTxList(data))
    }
};

const initialState = {
    blocks: ['ARR'],
    block: ['OBJ'],
    blockTx: ['ARR'],
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
            newState.block = action.payload
            return newState
        }
        default:
      return state;
    }
};

export default blocksReducer;