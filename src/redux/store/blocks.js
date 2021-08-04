import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config' 
// action types
const GET_BLOCKLIST='blocks/GET_BLOCKLIST';
// const GET_BLOCKINFO='blocks/GET_BLOCKINFO'
// const GET_BLOCKTXLIST='blocks/GET_BLOCKTXLIST'
// thunk actions

const getBlockList = (blocks) => ({
    type: GET_BLOCKLIST,
    blocks
});

export const blockList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    const response = trackerApi.get(makeUrl('/v3/block/list', payload));
    if (response.ok) {
        const blockInfo = await response.data;
        dispatch(getBlockList(blockInfo))
    }
}

// export async function blockList(payload) {
//     const trackerApi = await trackerApiInstance()
//     return new Promise((resolve, reject) => {
//       trackerApi.get(makeUrl('/v3/block/list', payload))
//         .then(result => {
//           resolve(result.data)
//         })
//         .catch(error => {
//           reject(error)
//         })
//     })
//   }
  
//   export async function blockInfo(payload) {
//     const trackerApi = await trackerApiInstance()
//     return new Promise((resolve, reject) => {
//       trackerApi.get(makeUrl('/v3/block/info', payload))
//         .then(result => {
//           resolve(result.data)
//         })
//         .catch(error => {
//           reject(error)
//         })
//     })
//   }
  
//   export async function blockTxList(payload) {
//     const trackerApi = await trackerApiInstance()
//     return new Promise((resolve, reject) => {
//       trackerApi.get(makeUrl('/v3/block/txList', payload))
//         .then(result => {
//           resolve(result.data)
//         })
//         .catch(error => {
//           reject(error)
//         })
//     })
//   }

// state reducer
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
            return newState;
        }
        default:
      return state;
    }
}

// default export

export default blocksReducer;