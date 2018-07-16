import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
  blocks: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: ''
  },
  blockDetail: {
    loading: false,
    error: '',
  },
  blockTx: {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    totalData: 0,
    error: ''
  }
}

export function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.blockList: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.blocks.count,
          error: ''
        }        
      }
    }

    case actionTypes.blockListFulfilled: {
      console.log(action.payload)
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: false,
          data: action.payload.data || [],
          totalData: action.payload.listSize || 0,
          error: ''
        }        
      }
    }

    case actionTypes.blockListRejected: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          loading: false,
          error: action.error
        }        
      }
    }

    case actionTypes.blockInfo: {
      return {
        ...state,
        blockDetail: {
          ...state.blockDetail,
          loading: true,
          error: ''
        }
      }
    }

    case actionTypes.blockInfoFulfilled: {
      return {
        ...state,
        blockDetail: {
          ...action.payload.data.blockDetail,
          loading: false,
          error: ''
        }
      }
    }

    case actionTypes.blockInfoRejected: {
      return {
        ...state,
        blockDetail: {
          ...state.blockDetail,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.blockTxList: {
      return {
        ...state,
        blockTx: {
          ...state.blockTx,
          loading: true,
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state.blockTx.count,
          error: ''
        }
      }
    }

    case actionTypes.blockTxListFulfilled: {
      console.log(action.payload)
      return {
        ...state,
        blockTx: {
          ...state.blockTx,
          loading: false,
          data: action.payload.data.txInBlock || [],
          totalData: action.payload.listSize || 0,
          error: ''  
        }
      }
    }

    case actionTypes.blockTxListRejected: {
      return {
        ...state,
        blockTx: {
          ...state.blockTx,
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
