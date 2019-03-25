import actionTypes from '../actionTypes/actionTypes';

export function setWalletAddress(payload) {
  return {
    type: actionTypes.setWalletAddress,
    payload
  }
}
