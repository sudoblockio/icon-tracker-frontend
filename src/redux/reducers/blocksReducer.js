import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const blocksInitState = {
  loading: true,
  data: [],
  pageNum: 1,
  maxPageNum: 1,
  error: ''
};

const blockInitState = {
  loading: true,
  data: {
    blockDetail: {},
    blockTx: []
  },
  pageNum: 1,
  maxPageNum: 1,
  error: ''
};

const initialState = {
    blocks: blocksInitState,
    block: blockInitState
}

export function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getBlocks: {
      console.log(action.payload)
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
          data : action.payload.data,
          error: ''
        }
      }
    }

    case actionTypes.getBlocksRejected: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false,
          error: action.error
        }
      }
    }

    case actionTypes.getBlock: {
      return {
        ...state,
        block : {
          ...state.block,
          loading: true
        }
      }
    }

    case actionTypes.getBlockFulfilled: {
      return {
        ...state,
        block : {
          ...state.block,
          loading: false,
          data : {
            ...state.block.data,
            blockDetail: action.payload.blockDetail,
            blockTx: action.payload.txInBlock
          },
          error: ''
        }
      }
    }

    case actionTypes.getBlockRejected: {
      return {
        ...state,
        block : {
          ...state.block,
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
