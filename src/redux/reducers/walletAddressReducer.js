import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  walletAddress:false
}

export function walletAddressReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setWalletAddress:
      return Object.assign({}, state, {
        payload: action.payload,
      })
    default: {
      return state
    }
  }
}
