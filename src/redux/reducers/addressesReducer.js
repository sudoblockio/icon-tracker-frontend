import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  addresses: {
    loading: true,
    data: [],
    pageNum: 1,
    error: ''
  },
  address: {
    loading: true,
    data: {
      walletDetail: {
        address: "",
        balance: 0,
        exchangeKrw: 0,
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
          loading: true
        }
      }
    }

    case actionTypes.getAddressesFulfilled: {
      return {
        ...state,
        addresses : {
          ...state.addresses,
          loading: false,
          data : action.payload,
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

    case actionTypes.initAddressDetail: {
      return {
        ...state,
        address : {
          loading: true,
          data: {
            walletDetail: {
              address: "",
              balance: 0,
              exchangeKrw: 0,
              txCount: 0,
              nodeType: ""
            },
            walletTx: []
          },
          error: ''
        }
      }
    }

    case actionTypes.getAddressDetail: {
      return {
        ...state,
        address : {
          ...state.address,
          loading: true
        }
      }
    }

    case actionTypes.getAddressDetailFulfilled: {
      return {
        ...state,
        address : {
          ...state.address,
          loading: false,
          data : action.payload,
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
