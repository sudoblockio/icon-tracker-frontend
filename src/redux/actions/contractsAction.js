import actionTypes from '../actionTypes/actionTypes';

export function selectContractList(payload) {
  return {
    type: actionTypes.selectContractList,
    payload
  }
}