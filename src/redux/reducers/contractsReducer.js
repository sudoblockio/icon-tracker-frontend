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
  contractReadInfo: {
    loading: false,
    queryIndex: 0,
    funcList: [],
    funcOutput: [],
    funcError: [],
    error: ''
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

    case actionTypes.icxCall: 
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          queryIndex: action.payload.index
        }
      }
    case actionTypes.icxCallFulfilled: 
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          funcOutput: action.payload.funcOutput
        }
      }
    case actionTypes.icxCallRejected: 
      return state

    case actionTypes.readContractInformation:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          loading: true,
          error: ''
        }
      }
    case actionTypes.readContractInformationFulfilled:
      return {
        ...state,
        contractReadInfo: {
          ...action.payload,
          loading: false,
          error: ''
        }
      }
    case actionTypes.readContractInformationRejected:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          loading: true,
          error: action.error
        }
      }

    default: {
      return state
    }
  }
}
