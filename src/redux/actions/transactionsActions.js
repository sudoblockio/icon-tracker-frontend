import actionTypes from '../actionTypes/actionTypes';

export function transactionRecentTx(payload) {
  return {
    type: actionTypes.transactionRecentTx,
    payload
  }
}

export function transactionTxDetail(payload){
  return {
    type: actionTypes.transactionTxDetail,
    payload
  };
}

export function transactionEventLogList(payload){
  return {
    type: actionTypes.transactionEventLogList,
    payload
  };
}

export function transactionInternalTxList(payload){
  return {
    type: actionTypes.transactionInternalTxList,
    payload
  };
}
