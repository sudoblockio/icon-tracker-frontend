import actionTypes from '../actionTypes/actionTypes';

export function contractList(payload) {
  return {
    type: actionTypes.contractList,
    payload
  }
}

export function contractInfo(payload) {
  return {
    type: actionTypes.contractInfo,
    payload
  }
}

export function contractTxList(payload) {
  return {
    type: actionTypes.contractTxList,
    payload
  }
}

export function contractTokenTxList(payload) {
  return {
    type: actionTypes.contractTokenTxList,
    payload
  }
}

export function icxGetScore(payload) {
  return {
    type: actionTypes.icxGetScore,
    payload
  }
}

export function readContractInformation(payload) {
  return {
    type: actionTypes.readContractInformation,
    payload
  }
}