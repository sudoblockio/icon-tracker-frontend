import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  loading: false,
  error: ''
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
        error: ''
      })
    case actionTypes.searchRejected:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    default: {
      return state
    }
  }
}
