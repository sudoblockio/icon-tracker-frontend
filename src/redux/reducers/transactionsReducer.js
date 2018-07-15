import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  recentTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  transaction: {
    loading: true,
    data: {},
    error: ''
  }
}

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.transactionRecentTx: {
      return {
        ...state,
        recentTx: {
          ...state.recentTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || 20,
          error: ''
        }        
      }
    }

    case actionTypes.transactionRecentTxFulfilled: {
      return {
        ...state,
        recentTx: {
          ...state.recentTx,
          loading: false,
          data: action.payload.data || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.transactionRecentTxRejected: {
      return {
        ...state,
        recentTx: {
          ...state.recentTx,
          loading: false,
          error: action.error
        }        
      }
    }    

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
