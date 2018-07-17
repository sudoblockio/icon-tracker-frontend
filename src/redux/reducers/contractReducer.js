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
  }
}

export function contractReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.selectContractInfo: {
      return {
        ...state,
        contract: {
          ...state.contract,
          loading: true,
          error: ''
        }
      }
    }

    case actionTypes.selectContractInfoFulfilled: {
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

    case actionTypes.selectContractInfoRejected: {
      return {
        ...state,
        contract: {
          ...state.contract,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.selectContractTransactionList: {
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

    case actionTypes.selectContractTransactionListFulfilled: {
      return {
        ...state,
        contractTx: {
          ...state.contractTx,
          loading: false,
          data: action.payload.data.contractTransactionList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.selectContractTransactionListRejected: {
      return {
        ...state,
        contractTx: {
          ...state.contractTx,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.selectContractTokenTransferList: {
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

    case actionTypes.selectContractTokenTransferListFulfilled: {
      return {
        ...state,
        contractTokenTx: {
          ...state.contractTokenTx,
          loading: false,
          data: action.payload.data.contractTokenTransferList || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }
      }
    }

    case actionTypes.selectContractTokenTransferListRejected: {
      return {
        ...state,
        contractTokenTx: {
          ...state.contractTokenTx,
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
