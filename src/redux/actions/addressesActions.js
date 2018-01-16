import actionTypes from '../actionTypes/actionTypes';

export function getAddresses(payload) {
  return {
    type: actionTypes.getAddresses,
    payload
  };
}

export function getAddressDetail(payload) {
  return {
    type: actionTypes.getAddressDetail,
    payload
  };
}
