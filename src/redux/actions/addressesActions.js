import actionTypes from '../actionTypes/actionTypes';

export function getAddresses(payload) {
  return {
    type: actionTypes.getAddresses,
    payload
  };
}

export function addressInfo(payload) {
  return {
    type: actionTypes.addressInfo,
    payload
  }
}

export function addressTxList(payload) {
  return {
    type: actionTypes.addressTxList,
    payload
  }
}

export function addressTokenTxList(payload) {
  return {
    type: actionTypes.addressTokenTxList,
    payload
  }
}