import actionTypes from '../actionTypes/actionTypes';

export function tokenGetTokenList(payload) {
  console.log('tokenGetTokenList', payload)
  return {
    type: actionTypes.tokenGetTokenList,
    payload
  }
}