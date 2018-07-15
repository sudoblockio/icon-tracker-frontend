import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { 
  transactionTxDetailApi as TRANSACTION_TX_DETAIL_API,
  transactionRecentTxApi as TRANSACTION_RECENT_TX_API 
} from '../api/restV3';

function* transactionRecentTxFunc(action) {
  try {
    const payload = yield call(TRANSACTION_RECENT_TX_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.transactionRecentTxFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.transactionRecentTxRejected, error: action.payload});
  }
}

function* getTransactionFunc(action){
  try {
    const payload = yield call(TRANSACTION_TX_DETAIL_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.getTransactionFulfilled, payload: payload.data});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.getTransactionRejected, error: action.payload});
  }
}

function* watchTransactionRecentTx() {
  yield takeLatest (AT.transactionRecentTx, transactionRecentTxFunc)
}

function* watchGetTransaction() {
  yield takeLatest(AT.getTransaction, getTransactionFunc);
}

export default function* transactionsSaga() {
  yield fork(watchTransactionRecentTx);
  yield fork(watchGetTransaction);
}
