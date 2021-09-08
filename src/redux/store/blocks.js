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
    console.log(payload, "blocklist payload")

    const trackerApi = await trackerApiInstance()
    try {
        const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
        if (response.data) {
            const data = response.data;
             dispatch(getblockList(data))
             return data
        }}
    catch (e) {
        console.log(e, "e from the blockList")
    }
};

export const blockTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
    const response = await trackerApi.get(`/api${BLOCK_PREFIX}/${payload.number}`);
    if (response.data) {
        const data = response.data;
        dispatch(getblockTxList(data))
    }}
    catch (e) {
        console.log(e, "error from blockTxList")
    }
};

export const blockInfo = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
        const response = await trackerApi.get(makeUrl(`${BLOCK_PREFIX}`, payload));
        console.log(response, "res from blockinfo")
        if (response.data) {
            const data = response.data;
            dispatch(getblockInfo(data))
            return data
    }}
    catch (e) {
        console.log(e, "error from blockInfo")
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
            console.log(newState, "state from reducer BLOCKINFO")
            newState.block = action.payload
            return newState
        }
        case BLOCK_TX_LIST: {
            newState = deepcopy(state)
            newState.blockTx = action.payload
            console.log(newState, "state from reducer BLOCKTXLIST")
            return newState
        }
        default:
      return state;
    }
};

export default blocksReducer;