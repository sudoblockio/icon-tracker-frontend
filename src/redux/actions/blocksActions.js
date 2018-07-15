import actionTypes from '../actionTypes/actionTypes';

export function getBlocks(payload) {
  return {
    type: actionTypes.getBlocks,
    payload
  };
}

export function blockInfo(payload) {
  return {
    type: actionTypes.blockInfo,
    payload
  }
}

export function blockTxList(payload) {
  return {
    type: actionTypes.blockTxList,
    payload
  }
}

export function resetBlocksReducer() {
  return {
    type: actionTypes.resetBlocksReducer
  };
}


export function resetBlockReducer() {
  return {
    type: actionTypes.resetBlockReducer
  };
}
