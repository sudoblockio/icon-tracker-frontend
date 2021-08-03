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
  contractsSearch: INITIAL_STATE['ARR'],
  contract: INITIAL_STATE['OBJ'],
  contractDetail: INITIAL_STATE['OBJ'],
  contractTx: INITIAL_STATE['ARR'],
  contractInternalTx: INITIAL_STATE['ARR'],
  contractTokenTx: INITIAL_STATE['ARR'],
  contractEvents: INITIAL_STATE['ARR'],
  contractAbi: INITIAL_STATE['OBJ'],
  contractReadInfo: {
    loading: false,
    funcList: [],
    funcOutputs: [],
    funcError: [],
    error: ''
  }
}

export function contractsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.contractList: return getState('ARR', REDUX_STEP.READY, state, action, 'contracts')
    case actionTypes.contractListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contracts')
    case actionTypes.contractListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contracts')

    case actionTypes.contractListSearch: return getState('ARR', REDUX_STEP.READY, state, action, 'contractsSearch')
    case actionTypes.contractListSearchFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractsSearch')
    case actionTypes.contractListSearchRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractsSearch')

    case actionTypes.contractInfo: return getState('OBJ', REDUX_STEP.READY, state, action, 'contract')
    case actionTypes.contractInfoFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'contract')
    case actionTypes.contractInfoRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'contract')

    case actionTypes.contractDetail: return getState('OBJ', REDUX_STEP.READY, state, action, 'contractDetail')
    case actionTypes.contractDetailFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'contractDetail')
    case actionTypes.contractDetailRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'contractDetail')

    case actionTypes.contractTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractTx')
    case actionTypes.contractTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractTx')
    case actionTypes.contractTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractTx')

    case actionTypes.contractInternalTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractInternalTx')
    case actionTypes.contractInternalTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractInternalTx')
    case actionTypes.contractInternalTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractInternalTx')

    case actionTypes.contractTokenTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractTokenTx')
    case actionTypes.contractTokenTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractTokenTx')
    case actionTypes.contractTokenTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractTokenTx')

    case actionTypes.contractEventLogList: return getState('ARR', REDUX_STEP.READY, state, action, 'contractEvents')
    case actionTypes.contractEventLogListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contractEvents')
    case actionTypes.contractEventLogListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contractEvents')

    case actionTypes.icxGetScore: return getState('OBJ', REDUX_STEP.READY, state, action, 'contractAbi')
    case actionTypes.icxGetScoreFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'contractAbi')
    case actionTypes.icxGetScoreRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'contractAbi')

    case actionTypes.icxCall:
      return state      
    case actionTypes.icxCallFulfilled:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          funcOutputs: action.payload.funcOutputs
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
          loading: false,
          error: action.error
        }
      }

    default: {
      return state
    }
  }
}
