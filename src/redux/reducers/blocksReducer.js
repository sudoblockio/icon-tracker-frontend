import actionTypes from '../actionTypes/actionTypes';
import {
  getArrayState,
  getObjectState
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_ARRAY_STATE,
  INITIAL_OBJECT_STATE,
} from '../../utils/const'

const initialState = {
  block: INITIAL_OBJECT_STATE,
  blockTx: INITIAL_ARRAY_STATE,
  blocks: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    listSize: 0,
    error: ''
  },
}

export function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.blockInfo: return getObjectState(REDUX_STEP.READY, state, action, 'block')
    case actionTypes.blockInfoFulfilled: return getObjectState(REDUX_STEP.FULFILLED, state, action, 'block')
    case actionTypes.blockInfoRejected: return getObjectState(REDUX_STEP.REJECTED, state, action, 'block')

    case actionTypes.blockTxList: return getArrayState(REDUX_STEP.READY, state, action, 'blockTx')
    case actionTypes.blockTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'blockTx')
    case actionTypes.blockTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'blockTx')

    case actionTypes.blockList: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.blocks.count,
          error: ''
        }        
      }
    }

    case actionTypes.blockListFulfilled: {
      console.log(action.payload)
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: false,
          data: action.payload.data || [],
          listSize: action.payload.listSize || 0,
          error: ''
        }        
      }
    }

    case actionTypes.blockListRejected: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: false,
          error: action.error
        }        
      }
    }

    default: {
      return state
    }
  }
}
