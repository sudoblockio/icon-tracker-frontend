import actionTypes from '../actionTypes/actionTypes';
import {
  getState,
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_STATE,
} from '../../utils/const'

const initialState = {
  contracts: INITIAL_STATE['ARR'],
  contract: INITIAL_STATE['OBJ'],
  contractTx: INITIAL_STATE['ARR'],
  contractTokenTx: INITIAL_STATE['ARR'],
  contractAbi: INITIAL_STATE['OBJ'],
  contractRead: {
    funcList: [],
  }
}

export function contractsReducer(state = initialState, action) {
  switch (action.type) {     
    case actionTypes.contractList: return getState('ARR', REDUX_STEP.READY, state, action, 'contracts') 
    case actionTypes.contractListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contracts') 
    case actionTypes.contractListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contracts') 

    case actionTypes.contractInfo: return getState('OBJ', REDUX_STEP.READY, state, action, 'contract') 
    case actionTypes.contractInfoFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'contract') 
    case actionTypes.contractInfoRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'contract') 

    case actionTypes.contractTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractTx') 
    case actionTypes.contractTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractTx') 
    case actionTypes.contractTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractTx') 

    case actionTypes.contractTokenTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractTokenTx') 
    case actionTypes.contractTokenTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractTokenTx') 
    case actionTypes.contractTokenTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractTokenTx') 

    case actionTypes.icxGetScore: return getState('OBJ', REDUX_STEP.READY, state, action, 'contractAbi') 
    case actionTypes.icxGetScoreFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'contractAbi') 
    case actionTypes.icxGetScoreRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'contractAbi') 

    case actionTypes.readContractInformation:
      const abiData = state.contractAbi.data || []
      const funcList = []
      abiData.map( func => {
          if (func['readOnly'] === "0x1") {
            funcList.push(func)
          }
      })
      return {
        ...state,
        contractRead: {
          ...state.contractRead,
          funcList
        }        
      }
    case actionTypes.readContractInformationFulfilled:
      return {
        
      }
    case actionTypes.readContractInformationRejected:
      return {
        
      }


    default: {
      return state
    }
  }
}
