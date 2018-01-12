import actionTypes from '../actionTypes/actionTypes';

export function getBlocks(payload) {
  return {
    type: actionTypes.getBlocks,
    payload
  };
}

export function getBlock(payload) {
  return {
    type: actionTypes.getBlock,
    payload
  };
}
