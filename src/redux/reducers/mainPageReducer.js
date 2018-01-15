import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  loading: true,
  tmainInfo: {},
  tmainChart: [],
  tmainBlock: [],
  tmainTx: [],
}

export function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getMainInfoFulfilled:
      let { payload } = action
      payload.loading = false
      return Object.assign({}, state, payload)

    default: {
      return state
    }
  }
}
