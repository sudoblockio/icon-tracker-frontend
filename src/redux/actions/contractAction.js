import actionTypes from '../actionTypes/actionTypes';

export function selectContractInfo(payload) {
  return {
    type: actionTypes.selectContractInfo,
    payload
  }
}

export function selectContractTransactionList(payload) {
  return {
    type: actionTypes.selectContractTransactionList,
    payload
  }
}

export function selectContractTokenTransferList(payload) {
  return {
    type: actionTypes.selectContractTokenTransferList,
    payload
  }
}
