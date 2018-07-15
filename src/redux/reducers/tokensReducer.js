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
  tokenTransfers: {
    loading: true,
    data: {},
    error: ''
  }
}

export function tokensReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.tokenGetTokenList: {
      console.log(actionTypes.tokenGetTokenList)
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || 20,
          error: ''
        }        
      }
    }

    case actionTypes.tokenGetTokenListFulfilled: {
      console.log(actionTypes.tokenGetTokenListFulfilled, action.payload)
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
      console.log(actionTypes.tokenGetTokenListRejected)
      return {
        ...state,
        tokenList: {
          ...state.tokenList,
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
