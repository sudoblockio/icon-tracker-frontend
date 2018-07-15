import actionTypes from '../actionTypes/actionTypes';

export function transactionRecentTx(payload) {
  return {
    type: actionTypes.transactionRecentTx,
    payload
  }
}

export function getTransaction(payload){
  return {
    type: actionTypes.getTransaction,
    payload
  };
}
