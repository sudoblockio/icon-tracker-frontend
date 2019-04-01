import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {getTransactionResult, delay} from "../../utils/utils";
import {
  transactionRecentTx as TRANSACTION_RECENT_TX_API,
  transactionTxDetail as TRANSACTION_TX_DETAIL_API,
  transactionEventLogList as TRANSACTION_EVENT_LOG_LIST_API,
  transactionInternalTxList as TRANSACTION_INTERNAL_TX_LIST_API,
} from '../api/restV3';

function* watchTransactionRecentTx() { yield takeLatest(AT.transactionRecentTx, transactionRecentTxFunc) }
function* watchTransactionTxDetail() { yield takeLatest(AT.transactionTxDetail, transactionTxDetailFunc) }
function* watchTransactionEventLogList() { yield takeLatest(AT.transactionEventLogList, transactionEventLogListFunc) }
function* watchTransactionInternalTxList() { yield takeLatest(AT.transactionInternalTxList, transactionInternalTxListFunc) }

export default function* transactionsSaga() {
  yield fork(watchTransactionRecentTx);
  yield fork(watchTransactionTxDetail);
  yield fork(watchTransactionEventLogList);
  yield fork(watchTransactionInternalTxList);
}

function* transactionRecentTxFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.transactionRecentTxFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TRANSACTION_RECENT_TX_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.transactionRecentTxFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.transactionRecentTxRejected });
  }
}

function* transactionTxDetailFunc(action) {
  const res = yield call (getTransactionResult,action.payload.txHash);
  const payload = yield call(TRANSACTION_TX_DETAIL_API, action.payload);
  try {
    if(res.status === 1){
      if(payload.result === "200"){
        yield put({ type: AT.transactionTxDetailFulfilled,payload:payload});
      }else if(payload.result === "No Data"){
        yield call(delay, 5000);
        const payload = yield call(TRANSACTION_TX_DETAIL_API, action.payload);
        if(payload.result ==='200'){
          yield put({ type: AT.transactionTxDetailFulfilled, payload: payload });
        }else{
          throw new Error();
        }
      }
    } else if (res.status === 0){
      yield put({ type: AT.transactionTxDetailRejected, error: action.payload.txHash, pending:true });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.transactionTxDetailRejected, error: action.payload.txHash });
  }
}

function* transactionEventLogListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.transactionEventLogListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TRANSACTION_EVENT_LOG_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.transactionEventLogListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.transactionEventLogListRejected });
  }
}

function* transactionInternalTxListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.transactionInternalTxListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TRANSACTION_INTERNAL_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.transactionInternalTxListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.transactionInternalTxListRejected });
  }
}