import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const blocksInitState = {
  loading: true,
  data: [],
  totalData: 0,
  pageNum: 1,
  maxPageNum: 1
};

const blockInitState = {
  loading: true,
  data: {
    blockDetail: {},
    blockTx: []
  },
  totalData: 0,
  pageNum: 1,
  maxPageNum: 1,
  error: ''
};

const initialState = {
  blocks: blocksInitState,
  block: blockInitState,

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
    case actionTypes.getBlocks: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: true,
          pageNum: action.payload || 1
        }
      }
    }

    case actionTypes.getBlocksFulfilled: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false,
          maxPageNum: calcMaxPageNum(action.payload.totalData, 20),
          totalData: action.payload.totalData,
          data : action.payload.data
        }
      }
    }

    case actionTypes.getBlocksRejected: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false
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
          count: Number(action.payload.count) || 20,
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

    case actionTypes.resetBlocksReducer: {
      return {
        ...state,
        blocks: blocksInitState
      }
    }

    case actionTypes.resetBlockReducer: {
      return {
        ...state,
        block: blockInitState
      }
    }

    default: {
      return state
    }
  }
}
