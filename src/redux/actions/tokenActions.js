import actionTypes from '../actionTypes/actionTypes';

export function tokenGetTokenSummary(payload) {
  return {
    type: actionTypes.tokenGetTokenSummary,
    payload
  }
}

export function tokenGetTokenTransfers(payload) {
  return {
    type: actionTypes.tokenGetTokenTransfers,
    payload
  }
}

export function tokenGetTokenHolders(payload) {
  return {
    type: actionTypes.tokenGetTokenHolders,
    payload
  }
}