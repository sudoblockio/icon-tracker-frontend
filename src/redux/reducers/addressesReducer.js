import actionTypes from '../actionTypes/actionTypes'
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  addresses: {
    // loading: true,
    // pageNum: 1,
    // maxPageNum: 1,
    // data: []
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },

  walletDetail: {
    loading: false,
    data: {},
    error: ''
  },
  walletTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  walletTokenTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  }
}

export function addressesReducer(state = initialState, action) {
  switch (action.type) {
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

    case actionTypes.addressTxList: {
      return {
        ...state,
        walletTx: {
          ...state.walletTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.walletTx.count,
          error: ''
        }        
      }
    }

    case actionTypes.addressTxListFulfilled: {
      console.log(action.payload)
      return {
        ...state,
        walletTx: {
          ...state.walletTx,
          loading: false,
          data: action.payload.data.walletTx || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }        
      }
    }

    case actionTypes.addressTxListRejected: {
      return {
        ...state,
        walletTx: {
          ...state.walletTx,
          loading: false,
          error: action.error
        }        
      }
    }

    case actionTypes.addressTokenTxList: {
      return {
        ...state,
        walletTokenTx: {
          ...state.walletTokenTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.walletTokenTx.count,
          error: ''
        }        
      }
    }

    case actionTypes.addressTokenTxListFulfilled: {
      return {
        ...state,
        walletTokenTx: {
          ...state.walletTokenTx,
          loading: false,
          data: action.payload.data.tokenTx || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.addressTokenTxListRejected: {
      return {
        ...state,
        walletTokenTx: {
          ...state.walletTokenTx,
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
          totalData: action.payload.listSize || 0,
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
