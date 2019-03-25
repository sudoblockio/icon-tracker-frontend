import actionTypes from '../actionTypes/actionTypes';

export function setBannerOption(payload) {
  return {
    type: actionTypes.setBannerOption,
    payload
  }
}

export function setWalletAddress(payload) {
  return {
    type: actionTypes.setWalletAddress,
    payload
  }
}

export function clearWalletAddress(){
  return{
    type:actionTypes.clearWalletAddress
  }
}