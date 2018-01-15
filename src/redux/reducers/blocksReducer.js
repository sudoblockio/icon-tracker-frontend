import actionTypes from '../actionTypes/actionTypes'

const initialState = {
    blocks: {
      loading: true,
      data: [],
      pageNum: 0,
      error: ''
    },
    block: {
      loading: true,
      data: {},
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
          loading: true
        }
      }
    }

    case actionTypes.getBlocksFulfilled: {
      return {
        ...state,
        blocks : {
          ...state.blocks,
          loading: false,
          data : action.payload,
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
