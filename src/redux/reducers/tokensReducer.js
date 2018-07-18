import actionTypes from '../actionTypes/actionTypes';
import {
  getArrayState
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_ARRAY_STATE
} from '../../utils/const'

const initialState = {
  recentTokenTx: INITIAL_ARRAY_STATE,
  tokenList: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    listSize: 0,
    error: '',
  }
}

export function tokensReducer(state = initialState, action) {
  switch (action.type) { 
    case actionTypes.tokenTxList: return getArrayState(REDUX_STEP.READY, state, action, 'recentTokenTx') 
    case actionTypes.tokenTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'recentTokenTx') 
    case actionTypes.tokenTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'recentTokenTx') 
    
    case actionTypes.tokenGetTokenList: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.tokenList.count,
          error: ''
        }        
      }
    }

    case actionTypes.tokenGetTokenListFulfilled: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: false,
          data: action.payload.data.tokenInfoList || [],
          listSize: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenListRejected: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
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
