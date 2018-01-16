import actionTypes from '../actionTypes/actionTypes';

export function search(payload) {
  return {
    type: actionTypes.search,
    payload
  }
}
