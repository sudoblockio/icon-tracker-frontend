import actionTypes from '../actionTypes/actionTypes';



export function transactionInternalTxList(payload){
  return {
    type: actionTypes.transactionInternalTxList,
    payload
  };
}