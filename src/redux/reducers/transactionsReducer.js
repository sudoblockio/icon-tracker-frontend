import actionTypes from '../actionTypes/actionTypes';

const initialState = {
  transactions: {
    loading: true,
    data: [],
    pageNum: 0,
    error: ''
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
          loading: true
        }
      }
    }

    case actionTypes.getTransactionsFulfilled: {
      return {
        ...state,
        transactions : {
          ...state.transactions,
          loading: false,
          data : action.payload,
          error: ''
        }
      }
    }

    case actionTypes.getTransactionsRejected: {
      return {
        ...state,
        transactions : {
          ...state.transactions,
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