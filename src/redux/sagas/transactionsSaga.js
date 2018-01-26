import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { getTransactionsApi as GET_TRANSACTIONS_API } from '../api/rest';
import { getTransactionApi as GET_TRANSACTION_API } from '../api/rest';

function* getTransactionsFunc(action) {
  try {
    const payload = yield call(GET_TRANSACTIONS_API, action.payload);
    yield put({type: AT.getTransactionsFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getTransactionsRejected});
  }
}

function* getTransactionFunc(action){
  try {
    const payload = yield call(GET_TRANSACTION_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.getTransactionFulfilled, payload: payload.data});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.getTransactionRejected, error: action.payload});
  }
}

function* watchGetTransaction() {
  yield takeLatest(AT.getTransaction, getTransactionFunc);
}

function* watchGetTransactions() {
  yield takeLatest(AT.getTransactions, getTransactionsFunc)
}

export default function* transactionsSaga() {
 yield fork(watchGetTransactions);
 yield fork(watchGetTransaction);
}
