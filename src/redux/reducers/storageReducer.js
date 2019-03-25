import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  bannerExpireDate: undefined,
  walletAddress:undefined
}

export function storageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setBannerOption:
      return Object.assign({}, state, {
        bannerExpireDate: action.payload.bannerExpireDate,
      })
      case actionTypes.setWalletAddressSuccess:
      return Object.assign({}, state, {
        walletAddress:action.payload
      })
      case actionTypes.clearWalletAddressSuccess:
      return Object.assign({}, state, {
        walletAddress:undefined
      })
    default: {
      return state
    }
  }
}
