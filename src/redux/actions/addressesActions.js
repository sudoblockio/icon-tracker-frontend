import actionTypes from '../actionTypes/actionTypes';

export function addressList(payload) {
  return {
    type: actionTypes.addressList,
    payload
  }
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

export function addressInternalTxList(payload) {
  return {
    type: actionTypes.addressInternalTxList,
    payload
  }
}

export function addressTokenTxList(payload) {
  return {
    type: actionTypes.addressTokenTxList,
    payload
  }
}

export function addressDelegationList(payload) {
  return {
    type: actionTypes.addressDelegationList,
    payload
  }
}

export function addressVotedList(payload) {
  return {
    type: actionTypes.addressVotedList,
    payload
  }
}

