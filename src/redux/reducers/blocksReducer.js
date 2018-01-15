import actionTypes from '../actionTypes/actionTypes';
import { calcMaxPageNum } from '../../utils/utils';

const initialState = {
    blocks: {
      loading: true,
      data: [],
      pageNum: 1,
      maxPageNum: 1,
      error: ''
    },
    block: {
      loading: true,
      data: {
        blockDetail: {},
        blockTx: []
      },
      error: ''
    }
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
          pageNum: Number(action.payload) || 1
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
          data : action.payload,
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

    default: {
      return state
    }
  }
}
