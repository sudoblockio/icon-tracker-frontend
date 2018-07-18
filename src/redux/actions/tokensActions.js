import actionTypes from '../actionTypes/actionTypes';

export function tokenGetTokenList(payload) {
  return {
    type: actionTypes.tokenGetTokenList,
    payload
  }
}

export function tokenTxList(payload) {
  return {
    type: actionTypes.tokenTxList,
    payload
  }
}