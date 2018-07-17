import actionTypes from '../actionTypes/actionTypes';

const initialState = {
  token: {
    loading: false,
    data: {},
    error: ''
  },
  tokenTransfers: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  tokenHolders: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  }
}

export function tokenReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.tokenGetTokenSummary: {
      return {
        ...state,
        token: {
          ...state.token,
          loading: true,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenSummaryFulfilled: {
      return {
        ...state,
        token: {
          ...state.token,
          loading: false,
          data: action.payload.data,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenSummaryRejected: {
      return {
        ...state,
        token: {
          ...state.token,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.tokenGetTokenTransfers: {
      return {
        ...state,
        tokenTransfers: {
          ...state.tokenTransfers,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.tokenTransfers.count,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenTransfersFulfilled: {
      return {
        ...state,
        tokenTransfers: {
          ...state.tokenTransfers,
          loading: false,
          data: action.payload.data.tokenTransferList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenTransfersRejected: {
      return {
        ...state,
        tokenTransfers: {
          ...state.tokenTransfers,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.tokenGetTokenHolders: {
      console.log(action)
      return {
        ...state,
        tokenHolders: {
          ...state.tokenHolders,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.tokenHolders.count, // TODO 전체 조사
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenHoldersFulfilled: {
      console.log(action)
      return {
        ...state,
        tokenHolders: {
          ...state.tokenHolders,
          loading: false,
          data: action.payload.data.holderList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenHoldersRejected: {
      return {
        ...state,
        tokenHolders: {
          ...state.tokenHolders,
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
