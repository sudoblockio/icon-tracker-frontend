import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { getTransactionsApi as GET_TRANSACTIONS_API } from '../api/rest';

function* getTransactionsFunc(action) {
  try {
    const payload = yield call(GET_TRANSACTIONS_API, action.payload);
    yield put({type: AT.getTransactionsFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getTransactionRejected, error: e});
  }
}

function* watchGetTransactions() {
  yield takeLatest(AT.getTransactions, getTransactionsFunc)
}

export default function* transactionsSaga() {
 yield fork(watchGetTransactions);
}
