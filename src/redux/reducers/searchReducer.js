import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  loading: false,
  data: {}
}

export function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.search:
      return Object.assign({}, state, {
        loading: true
      })
    case actionTypes.searchFulfilled:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload
      })
    case actionTypes.searchRejected:
      return Object.assign({}, state, {
        loading: false
      })
    default: {
      return state
    }
  }
}
