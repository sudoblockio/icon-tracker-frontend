import actionTypes from '../actionTypes/actionTypes';

export function getTransactions(payload){
  return {
    type: actionTypes.getTransactions,
    payload
  };
}

export function getTransaction(payload){
  return {
    type: actionTypes.getTransaction,
    payload
  };
}