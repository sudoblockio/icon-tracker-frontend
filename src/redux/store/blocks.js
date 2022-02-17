import { trackerApiInstance } from "../api/restV3/config";
import actionTypes from "../actionTypes/actionTypes";
import { getState, makeUrl } from "../../utils/utils";
import { REDUX_STEP, INITIAL_STATE } from "../../utils/const";
import { prefixes } from '../../utils/const'

// ACTIONS
export function blockListAction(payload) {
    return {
      type: actionTypes.blockList,
      payload
    }
  }
  
  export function blockInfoAction(payload) {
    return {
      type: actionTypes.blockInfo,
      payload
    }
  }
  
  export function blockTxListAction(payload) {
    return {
      type: actionTypes.blockTxList,
      payload
    }
  }


//   API

// *update paths in utils/const to change prefixes app-wide.* 
  const { BLOCKS_PREFIX, TRANSACTIONS_PREFIX } = prefixes

export async function blockList(payload) {
    console.log(payload, "block payload what format youwant")
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
      trackerApi.get(makeUrl(`${BLOCKS_PREFIX}`, payload))
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  
  export async function blockInfo(payload) {
    const trackerApi = await trackerApiInstance()

    if (payload.height === '0' ) {
      const num = 800460000*Math.pow(10,18)
      const result = {
        data: {
          hash: "0xcf43b3fd45981431a0e64f79d07bfcf703e064b73b802c5f32834eec72142190",
          number: 0,
          transaction_amount: num.toString(16),
          transaction_fees: 0,
          message: "A rhizome has no beginning or end; it is always in the middle, between things, interbeing, intermezzo. The tree is filiation, but the rhizome is alliance, uniquely alliance. The tree imposes the verb 'to be' but the fabric of the rhizome is the conjunction, 'and ... and ...and...' This conjunction carries enough force to shake and uproot the verb 'to be.' Where are you going? Where are you coming from? What are you heading for? These are totally useless questions. - Mille Plateaux, Gilles Deleuze & Felix Guattari 'Hyperconnect the world'",
        },
        status: 200
      }
      return result
    }
    return new Promise((resolve, reject) => {
      trackerApi.get(`${BLOCKS_PREFIX}/${payload.height}`)
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }


  export async function blockTxList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
      trackerApi.get(`${TRANSACTIONS_PREFIX}/block-number/${payload.height}`)
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

// REDUCER

const initialState = {
    blocks: INITIAL_STATE['ARR'],
    block: INITIAL_STATE['OBJ'],
    blockTx: INITIAL_STATE['ARR'],
  }
  
  export function blocksReducer(state = initialState, action) {
    switch (action.type) {
      case actionTypes.blockList: return getState('ARR', REDUX_STEP.READY, state, action, 'blocks')
      case actionTypes.blockListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'blocks')
      case actionTypes.blockListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'blocks')
  
      case actionTypes.blockInfo: return getState('OBJ', REDUX_STEP.READY, state, action, 'block')
      case actionTypes.blockInfoFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'block')
      case actionTypes.blockInfoRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'block')
  
      case actionTypes.blockTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'blockTx')
      case actionTypes.blockTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'blockTx')
      case actionTypes.blockTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'blockTx')
  
      default: {
        return state
      }
    }
  }
  