import actionTypes from '../actionTypes/actionTypes'
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  addresses: {
    loading: true,
    pageNum: 1,
    maxPageNum: 1,
    data: []
  },
  walletDetail: {
    loading: false,
    address: "",
    balance: 0,
    icxUsd: 0,
    nodeType: "",
    txCount: 0,
    tokenTxCount: 0,
    error: '',
  },
  walletTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  tokenTx: {
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
    case actionTypes.getAddresses: {
      return {
        ...state,
        addresses : {
          ...state.addresses,
          loading: true,
          pageNum: Number(action.payload) || 1
        }
      }
    }

    case actionTypes.getAddressesFulfilled: {
      return {
        ...state,
        addresses : {
          ...state.addresses,
          loading: false,
          maxPageNum: calcMaxPageNum(action.payload.totalData, 20),
          data : action.payload.data
        }
      }
    }

    case actionTypes.getAddressesRejected: {
      return {
        ...state,
        addresses : {
          ...state.addresses,
          loading: false
        }
      }
    }

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
          ...action.payload.data.walletDetail,
          loading: false,
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
          count: Number(action.payload.count) || 20,
          error: ''
        }        
      }
    }

    case actionTypes.addressTxListFulfilled: {
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
        tokenTx: {
          ...state.tokenTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || 20,
          error: ''
        }        
      }
    }

    case actionTypes.addressTokenTxListFulfilled: {
      return {
        ...state,
        tokenTx: {
          ...state.tokenTx,
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
        tokenTx: {
          ...state.tokenTx,
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
