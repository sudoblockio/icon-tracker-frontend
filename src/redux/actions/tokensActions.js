import actionTypes from '../actionTypes/actionTypes';

export function tokenGetTokenList(payload) {
  return {
    type: actionTypes.tokenGetTokenList,
    payload
  }
}

export function tokenGetTokenTransferList(payload) {
  return {
    type: actionTypes.tokenGetTokenTransferList,
    payload
  }
}