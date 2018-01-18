import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  transactions: {
    loading: true,
    data: [],
    pageNum: 1,
    maxPageNum: 1
  },
  transaction: {
    loading: true,
    data: {},
    error: ''
  }
}

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getTransactions: {
      return {
        ...state,
        transactions : {
          ...state.transactions,
          loading: true,
          pageNum: Number(action.payload) || 1
        }
      }
    }

    case actionTypes.getTransactionsFulfilled: {
      return {
        ...state,
        transactions : {
          ...state.transactions,
          loading: false,
          maxPageNum: calcMaxPageNum(action.payload.totalData, 20),
          data : action.payload.data
        }
      }
    }

    case actionTypes.getTransactionsRejected: {
      return {
        ...state,
        transactions : {
          ...state.transactions,
          loading: false
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
