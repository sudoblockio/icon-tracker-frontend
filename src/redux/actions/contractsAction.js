import actionTypes from '../actionTypes/actionTypes';

export function contractList(payload) {
  return {
    type: actionTypes.contractList,
    payload
  }
}