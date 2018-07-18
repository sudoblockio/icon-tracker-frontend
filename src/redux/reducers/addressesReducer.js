import actionTypes from '../actionTypes/actionTypes'
import {
  getArrayState
} from '../../utils/utils'
import {
  REDUX_STEP,
  INITIAL_ARRAY_STATE
} from '../../utils/const'

const initialState = {
  walletTx: INITIAL_ARRAY_STATE,
  walletTokenTx: INITIAL_ARRAY_STATE,
  addresses: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    listSize: 0,
    error: '',
  },
  walletDetail: {
    loading: false,
    data: {},
    error: ''
  },
}

export function addressesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.addressTxList: return getArrayState(REDUX_STEP.READY, state, action, 'walletTx') 
    case actionTypes.addressTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'walletTx') 
    case actionTypes.addressTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'walletTx') 

    case actionTypes.addressTokenTxList: return getArrayState(REDUX_STEP.READY, state, action, 'walletTokenTx') 
    case actionTypes.addressTokenTxListFulfilled: return getArrayState(REDUX_STEP.FULFILLED, state, action, 'walletTokenTx') 
    case actionTypes.addressTokenTxListRejected: return getArrayState(REDUX_STEP.REJECTED, state, action, 'walletTokenTx') 

    case actionTypes.addressInfo: {
      return {
        ...state,
        walletDetail: {
          ...state.walletDetail,
          loading: true,
          error: ''
        }        
      }
    }

    case actionTypes.addressInfoFulfilled: {
      return {
        ...state,
        walletDetail: {
          loading: false,
          data: action.payload.data.walletDetail || {},
          error: ''
        },
      } 
    }

    case actionTypes.addressInfoRejected: {
      return {
        ...state,
        walletDetail: {
          ...state.walletDetail,
          loading: false,
          error: action.error
        }        
      }
    }

    case actionTypes.addressList: {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.addresses.count,
          error: ''
        }        
      }
    }

    case actionTypes.addressListFulfilled: {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          loading: false,
          data: action.payload.data || [],
          listSize: action.payload.listSize || 0,
          error: ''
        }        
      }
    }

    case actionTypes.addressListRejected: {
      return {
        ...state,
        addresses: {
          ...state.addresses,
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
