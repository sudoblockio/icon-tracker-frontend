import actionTypes from '../actionTypes/actionTypes';

const initialState = {
  contract: {
    loading: false,
    data: {},
    error: ''
  },
  contractTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  contractTokenTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  },
  contractCode: {
    loading: false,
    data: {},
    error: ''
  }
}

export function contractReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.contractInfo: {
      return {
        ...state,
        contract: {
          ...state.contract,
          loading: true,
          error: ''
        }
      }
    }

    case actionTypes.contractInfoFulfilled: {
      return {
        ...state,
        contract: {
          ...state.contract,
          loading: false,
          data: action.payload.data,
          error: ''
        }
      }
    }

    case actionTypes.contractInfoRejected: {
      return {
        ...state,
        contract: {
          ...state.contract,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.contractTxList: {
      return {
        ...state,
        contractTx: {
          ...state.contractTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.contractTx.count,
          error: ''
        }
      }
    }

    case actionTypes.contractTxListFulfilled: {
      return {
        ...state,
        contractTx: {
          ...state.contractTx,
          loading: false,
          data: action.payload.data || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.contractTxListRejected: {
      return {
        ...state,
        contractTx: {
          ...state.contractTx,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.contractTokenTxList: {
      return {
        ...state,
        contractTokenTx: {
          ...state.contractTokenTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.contractTokenTx.count,
          error: ''
        }
      }
    }

    case actionTypes.contractTokenTxListFulfilled: {
      return {
        ...state,
        contractTokenTx: {
          ...state.contractTokenTx,
          loading: false,
          data: action.payload.data || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.contractTokenTxListRejected: {
      return {
        ...state,
        contractTokenTx: {
          ...state.contractTokenTx,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.icxGetScore: {
      return {
        ...state,
        contractCode: {
          ...state.contractCode,
          loading: true,
          error: ''
        }
      }
    }

    case actionTypes.icxGetScoreFulfilled: {
      console.log(action.payload)
      return {
        ...state,
        contractCode: {
          ...state.contractCode,
          loading: false,
          data: action.payload.data || {},
          error: ''
        }
      }
    }

    case actionTypes.icxGetScoreRejected: {
      console.log(action)
      return {
        ...state,
        contractCode: {
          ...state.contractCode,
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
