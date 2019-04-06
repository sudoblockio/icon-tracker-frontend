import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  bannerExpireDate: undefined,
  walletAddress: '',
  walletNotification: false,
  walletLanding: false,
}

export function storageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setBannerOption:
      return Object.assign({}, state, {
        bannerExpireDate: action.payload.bannerExpireDate,
      })
    case actionTypes.setAddressSuccess:
      return Object.assign({}, state, {
        walletAddress: action.payload
      })
    case actionTypes.setNotificationSuccess:
      return Object.assign({}, state, {
        walletNotification: action.payload
      })
    case actionTypes.clearWalletSuccess:
      return Object.assign({}, state, {
        walletAddress: '',
        walletNotification: false,
        walletLanding: false,
      })
    default: {
      return state
    }
  }
}
