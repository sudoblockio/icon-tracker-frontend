import actionTypes from '../actionTypes/actionTypes'
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  addresses: {
    loading: true,
    pageNum: 1,
    maxPageNum: 1,
    data: []
  },
  address: {
    loading: true,
    error: '',
    data: {
      walletDetail: {
        address: "",
        balance: 0,
        icxUsd: 0,
        txCount: 0,
        nodeType: ""
      },
      walletTx: [],
      tokenTx: []
    }
  },




  walletDetail: {
    address: "",
    balance: 0,
    icxUsd: 0,
    nodeType: "",
    txCount: 0,
    tokenTxCount: 0,
  },
  walletTx: {
    data: [],
    totalData: 0.
  },
  tokenTx: {
    data: [],
    totalData: 0,
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

    // case actionTypes.getAddressDetail: {
    //   return {
    //     ...state,
    //     address : {
    //       ...state.address,
    //       loading: true,
    //       pageNum: Number(action.payload.pageId) || 1
    //     }
    //   }
    // }

    // case actionTypes.getAddressDetailFulfilled: {
    //   return {
    //     ...state,
    //     address : {
    //       ...state.address,
    //       loading: false,
    //       maxPageNum: calcMaxPageNum(action.payload.totalData, 10),
    //       totalData: action.payload.totalData,
    //       data : action.payload.data,
    //       error: ''
    //     },
    //   }
    // }

    // case actionTypes.getAddressDetailRejected: {
    //   return {
    //     ...state,
    //     address : {
    //       ...state.address,
    //       loading: false,
    //       error: action.error
    //     },
    //   }
    // }

    case actionTypes.setAddress: {
      return {
        ...state,
        walletDetail: {
          ...state.walletDetail,
          address: action.address
        }
      }
    }

    case actionTypes.addressInfo: {
      return state
    }

    case actionTypes.addressInfoFulfilled: {
      return {
        ...state,
        walletDetail: action.payload.data.walletDetail,
      } 
    }

    case actionTypes.addressInfoRejected: {
      return state
    }

    case actionTypes.addressTxList: {
      return state
    }

    case actionTypes.addressTxListFulfilled: {
      return {
        ...state,
        walletTx: {
          data: action.payload.data.walletTx,
          totalData: action.payload.data.listSize,
        }        
      }
    }

    case actionTypes.addressTxListRejected: {
      return state

    }

    case actionTypes.addressTokenTxList: {
      return state
    }

    case actionTypes.addressTokenTxListFulfilled: {
      return {
        ...state,
        tokenTx: {
          data: action.payload.data.tokenTx,
          totalData: action.payload.data.listSize,
        }
      }
    }

    case actionTypes.addressTokenTxListRejected: {
      return state
    }

    default: {
      return state
    }
  }
}
