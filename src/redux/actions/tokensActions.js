import actionTypes from '../actionTypes/actionTypes';

export function tokenList(payload) {
  return {
    type: actionTypes.tokenList,
    payload
  }
}

export function tokenListSearch(payload) {
  return {
    type: actionTypes.tokenListSearch,
    payload
  }
}

export function tokenTxList(payload) {
  return {
    type: actionTypes.tokenTxList,
    payload
  }
}

export function tokenSummary(payload) {
  return {
    type: actionTypes.tokenSummary,
    payload
  }
}

export function tokenTransfersList(payload) {
  return {
    type: actionTypes.tokenTransfersList,
    payload
  }
}

export function tokenHoldersList(payload) {
  return {
    type: actionTypes.tokenHoldersList,
    payload
  }
}