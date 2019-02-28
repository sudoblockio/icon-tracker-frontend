import actionTypes from '../actionTypes/actionTypes';

export function setBannerOption(payload) {
  return {
    type: actionTypes.setBannerOption,
    payload
  }
}