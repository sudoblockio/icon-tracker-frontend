import actionTypes from '../actionTypes/actionTypes'
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  addresses: {
    loading: true,
    pageNum: 1,
    maxPageNum: 1,
    data: [],
    error: ''
  },
  address: {
    loading: true,
    pageNum: 1,
    maxPageNum: 1,
    data: {
      walletDetail: {
        address: "",
        balance: 0,
        icxUsd: 0,
        txCount: 0,
        nodeType: ""
      },
      walletTx: []
    },
    error: ''
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
          data : action.payload.data,
          error: ''
        }
      }
    }

    case actionTypes.getAddressesRejected: {
      return {
        ...state,
        addresses : {
          ...state.addresses,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.getAddressDetail: {
      return {
        ...state,
        address : {
          ...state.address,
          loading: true,
          pageNum: Number(action.payload.pageNum) || 1
        }
      }
    }

    case actionTypes.getAddressDetailFulfilled: {
      return {
        ...state,
        address : {
          ...state.address,
          loading: false,
          maxPageNum: calcMaxPageNum(action.payload.totalData, 10),
          data : action.payload.data,
          error: ''
        }
      }
    }

    case actionTypes.getAddressDetailRejected: {
      return {
        ...state,
        address : {
          ...state.address,
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
