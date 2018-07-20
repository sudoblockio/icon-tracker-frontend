import actionTypes from '../actionTypes/actionTypes';

export function initPopup() {
  return {
    type: actionTypes.initPopup
  }
}

export function setPopup(payload) {
  return {
    type: actionTypes.setPopup,
    payload
  }
}