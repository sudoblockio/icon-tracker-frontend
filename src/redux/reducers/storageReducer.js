import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  bannerExpireDate: undefined
}

export function storageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setBannerOption:
      return Object.assign({}, state, {
        bannerExpireDate: action.payload.bannerExpireDate,
      })
    default: {
      return state
    }
  }
}
