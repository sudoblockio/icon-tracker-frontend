import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config' 


const BLOCK_LIST = 'BLOCK_LIST'
const BLOCKLISTFULFILLED = 'BLOCK_LIST_FULFILLED'
const BLOCKLISTREJECTED = 'BLOCK_LIST_REJECTED'

const getblockList = (payload) => ({
    type: BLOCK_LIST,
    payload
});
console.log(getblockList, "blocklist")

// const getblockInfo = (payload) => ({
//     type: GET_BLOCKINFO,
//     payload
// });

// const getblockTxList = (payload) => ({
//     type: GET_BLOCKTXLIST,
//     payload
// });

// export const blockList = (payload) => async (dispatch) => {
//     const trackerApi = await trackerApiInstance()
//         return trackerApi.get(makeUrl('/v1/blocks', payload))
//         .then(result => dispatch(getblockList(result)))
//         .catch(error => console.log(error))  
//     }


export const blockList = (payload) => async (dispatch) => {
    const search = payload
    search.limit = search.count
    delete search.count;
    delete search.page;
    const trackerApi = await trackerApiInstance()
    try {
        const response = await trackerApi.get(makeUrl('/v1/blocks', payload));
        console.log(response, "response")
        if (response.ok) {
            const data = response.data;
             dispatch(getblockList(data))
        }}
    catch (e) {
        console.log(e, "e from the store")
    }
}


// export const blockInfo = (payload) => async (dispatch) => {
//     const trackerApi = await trackerApiInstance();
//     const response = trackerApi.get(makeUrl('/v3/block/info', payload));
//     if (response.ok) {
//         const data = await response.data;
//         dispatch(getblockInfo(data))
//     }
// };

export const blockTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    const response = trackerApi.get(makeUrl('/v3/block/txList', payload));
    if (response.ok) {
        const data = await response.data;
        // dispatch(getblockTxList(data))
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
            console.log(newState)
            return newState;
        }
        default:
      return state;
    }
};

export default blocksReducer;