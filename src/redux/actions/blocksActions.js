import actionTypes from '../actionTypes/actionTypes';

export function blockList(payload) {
  return {
    type: actionTypes.blockList,
    payload
  }
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