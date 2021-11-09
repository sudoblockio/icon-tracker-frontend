import actionTypes from '../actionTypes/actionTypes';


// ACTIONS
export function search(payload) {
  return {
    type: actionTypes.search,
    payload
  }
}

export function searchErrorReset() {
  return {
    type: actionTypes.searchErrorReset
  }
}

// REDUCER

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
      case actionTypes.searchErrorReset:
        return Object.assign({}, state, {
          loading: false,
          error: ''
        })
      default: {
        return state
      }
    }
  }
  