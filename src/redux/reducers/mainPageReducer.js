import actionTypes from '../actionTypes/actionTypes'

const initialState = {
  info: {
    loading: true,
    tmainInfo: {},
    tmainBlock: [],
    tmainTx: []
  },
  chart: {
    loading: true,
    tmainChart: []
  }
}


export function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getMainInfo:
      return {
        ...state,
        info: {
          ...state.info,
          loading: true
        }
      }

    case actionTypes.getMainInfoFulfilled:
      return {
        ...state,
        info: {
          ...action.payload,
          loading: false
        }
      }

    case actionTypes.getMainInfoRejected:
      return {
        ...state,
        info: {
          ...state.info,
          loading: false
        }
      }

    case actionTypes.getMainChart:
      return {
        ...state,
        chart: {
          ...state.chart,
          loading: true
        }
      }

    case actionTypes.getMainChartFulfilled:
      return {
        ...state,
        chart: {
          tmainChart: [...(action.payload || [])],
          loading: false
        }
      }

    case actionTypes.getMainChartRejected:
    return {
      ...state,
      chart: {
        ...state.chart,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}
