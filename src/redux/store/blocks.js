import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config' 

const GET_BLOCKLIST='blocks/GET_BLOCKLIST';
const GET_BLOCKINFO='blocks/GET_BLOCKINFO'
const GET_BLOCKTXLIST='blocks/GET_BLOCKTXLIST'

const getblockList = (payload) => ({
    type: GET_BLOCKLIST,
    payload
});

const getblockInfo = (payload) => ({
    type: GET_BLOCKINFO,
    payload
});

const getblockTxList = (payload) => ({
    type: GET_BLOCKTXLIST,
    payload
});

export const blockList = () => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try {const response = await trackerApi.get('/v1/blocks');
    console.log(response,"FROM THE STORE")
    if (response.ok) {
        const data = await response.json();
         dispatch(getblockList(data))
    }}
    catch (e) {
        console.log(e, "e from the store")
    }
}


// export async function blockList(payload) {
//     const trackerApi = await trackerApiInstance()
//     return new Promise((resolve, reject) => {
//       trackerApi.get(makeUrl('/v1/blocks', payload))
//         .then(result => {
//           console.log(result, "from rest")
//           resolve(result.data)
//         })
//         .catch(error => {
//           reject(error)
//         })
//     })
//   }

export const blockInfo = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    const response = trackerApi.get(makeUrl('/v3/block/info', payload));
    if (response.ok) {
        const data = await response.data;
        dispatch(getblockInfo(data))
    }
};

export const blockTxList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    const response = trackerApi.get(makeUrl('/v3/block/txList', payload));
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
        case GET_BLOCKLIST: {
            newState = deepcopy(state)
            console.log(newState)
            return newState;
        }
        default:
      return state;
    }
};

export default blocksReducer;