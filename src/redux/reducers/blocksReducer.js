import actionTypes from '../actionTypes/actionTypes';
import {
  getState,
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_STATE,
} from '../../utils/const'

const initialState = {
  blocks: INITIAL_STATE['ARR'],
  block: INITIAL_STATE['OBJ'],
  blockTx: INITIAL_STATE['ARR'],
}

export function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.blockList: return getState('OBJ', REDUX_STEP.READY, state, action, 'blocks')
    case actionTypes.blockListFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'blocks')
    case actionTypes.blockListRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'blocks')

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
