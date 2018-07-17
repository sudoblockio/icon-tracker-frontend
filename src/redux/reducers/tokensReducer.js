import actionTypes from '../actionTypes/actionTypes';

const initialState = {
  tokenList: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  recentTokenTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  token: {
    loading: false,
    data: {},
    error: ''
  }
}

export function tokensReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.tokenGetTokenList: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.tokenList.count,
          error: ''
        }        
      }
    }

    case actionTypes.tokenGetTokenListFulfilled: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: false,
          data: action.payload.data.tokenInfoList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenListRejected: {
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: false,
          error: action.error
        }        
      }
    }

    case actionTypes.tokenGetTokenTransferList: {
      return {
        ...state,
        recentTokenTx: {
          ...state.recentTokenTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.recentTokenTx.count,
          error: ''
        }        
      }
    }

    case actionTypes.tokenGetTokenTransferListFulfilled: {
      return {
        ...state,
        recentTokenTx: {
          ...state.recentTokenTx,
          loading: false,
          data: action.payload.data.tokenTransferList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.tokenGetTokenTransferListRejected: {
      return {
        ...state,
        recentTokenTx: {
          ...state.recentTokenTx,
          loading: false,
          error: action.error
        }        
      }
    }  

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

    default: {
      return state
    }
  }
}
