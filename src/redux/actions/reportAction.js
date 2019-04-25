import actionTypes from '../actionTypes/actionTypes';

export function reportScam(payload){
    return {
      type: actionTypes.reportScam,
      payload
    }
  }