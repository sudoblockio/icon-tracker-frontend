import actionTypes from '../actionTypes/actionTypes';
import {
  getArrayState
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_ARRAY_STATE
} from '../../utils/const'

const initialState = {
  recentTx: INITIAL_ARRAY_STATE,
  transaction: {
    loading: true,
    data: {},
    error: ''
  }
}

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.transactionRecentTx: return getArrayState(REDUX_STEP.READY, state, action, 'recentTx') 
    case actionTypes.transactionRecentTxFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'recentTx') 
    case actionTypes.transactionRecentTxRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'recentTx') 

    case actionTypes.getTransaction: {
      return {
        ...state,
        transaction : {
          ...state.transaction,
          loading: true
        }
      }
    }

    case actionTypes.getTransactionFulfilled: {
      return {
        ...state,
        transaction : {
          ...state.transaction,
          loading: false,
          data : action.payload,
          error: ''
        }
      }
    }

    case actionTypes.getTransactionRejected: {
      return {
        ...state,
        transaction : {
          ...state.transaction,
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
