import actionTypes from '../actionTypes/actionTypes';

const initialState = {
  contracts: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: '',
  }
}

export function contractsReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.selectContractList: {
      return {
        ...state,
        contracts: {
          ...state.contracts,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.contracts.count,
          error: ''
        }        
      }
    }

    case actionTypes.selectContractListFulfilled: {
      return {
        ...state,
        contracts: {
          ...state.contracts,
          loading: false,
          data: action.payload.data || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }        
      }
    }

    case actionTypes.selectContractListRejected: {
      return {
        ...state,
        contracts: {
          ...state.contracts,
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
