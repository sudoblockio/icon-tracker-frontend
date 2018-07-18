import actionTypes from '../actionTypes/actionTypes';
import {
  getArrayState,
  getObjectState,
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_ARRAY_STATE,
  INITIAL_OBJECT_STATE
} from '../../utils/const'

const initialState = {
  contracts: INITIAL_ARRAY_STATE,
  contract: INITIAL_OBJECT_STATE,
  contractTx: INITIAL_ARRAY_STATE,
  contractTokenTx: INITIAL_ARRAY_STATE,
  
  contractCode: INITIAL_OBJECT_STATE
}

export function contractsReducer(state = initialState, action) {
  switch (action.type) {     
    case actionTypes.contractInfo: return getObjectState(REDUX_STEP.READY, state, action, 'contract') 
    case actionTypes.contractInfoFulfilled: return getObjectState(REDUX_STEP.FULFILLED, state, action, 'contract') 
    case actionTypes.contractInfoRejected: return getObjectState(REDUX_STEP.REJECTED, state, action, 'contract') 

    case actionTypes.contractTxList: return getArrayState(REDUX_STEP.READY, state, action, 'contractTx') 
    case actionTypes.contractTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'contractTx') 
    case actionTypes.contractTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'contractTx') 

    case actionTypes.contractTokenTxList: return getArrayState(REDUX_STEP.READY, state, action, 'contractTokenTx') 
    case actionTypes.contractTokenTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'contractTokenTx') 
    case actionTypes.contractTokenTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'contractTokenTx') 

    default: {
      return state
    }
  }
}
