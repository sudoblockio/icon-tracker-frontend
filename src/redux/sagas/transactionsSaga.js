import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { convertEngineToTracker } from "../../utils/utils";
import {
  transactionRecentTx as TRANSACTION_RECENT_TX_API,
  transactionTxDetail as TRANSACTION_TX_DETAIL_API,
  transactionEventLogList as TRANSACTION_EVENT_LOG_LIST_API,
  transactionInternalTxList as TRANSACTION_INTERNAL_TX_LIST_API,
  getTransactionResult as GET_TRANSACTION_RESULT_API,
  getTransactionResultNotSdk as GET_TRANSACTION_RESULT_NOT_SDK_API,
  getTransaction as GET_TRANSACTION_API,
} from '../api/restV3';
import { transactionEventLogList } from '../actions/transactionsActions';

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
    if (payload.status === 200) {
      yield put({ type: AT.transactionRecentTxFulfilled, payload: payload });
    } else {

      throw new Error();
    }
  } catch (e) {

    yield put({ type: AT.transactionRecentTxRejected });
  }
}

function* transactionTxDetailFunc(action) {
  let trackerData, resultData, byHashData, data
  try {
    yield put(transactionEventLogList({ txHash: action.payload.txHash, count: 10 }))
    trackerData = yield call(TRANSACTION_TX_DETAIL_API, action.payload); 
    if (trackerData.status === 200 || trackerData.hash !== undefined) {      
      let { stepUsedDetails } = trackerData.data
      if (stepUsedDetails) {
        trackerData.data.stepUsedDetails = JSON.parse(stepUsedDetails)
      }
      else {
        const response = yield call(GET_TRANSACTION_RESULT_NOT_SDK_API, action.payload.txHash);
        trackerData.data.stepUsedDetails = response.stepUsedDetails
      }
      yield put({ type: AT.transactionTxDetailFulfilled, payload: trackerData });
      return
    }
  }
  catch (e) {
    console.error(e)
  }

  try {
    resultData = yield call(GET_TRANSACTION_RESULT_API, action.payload.txHash);
    if (resultData && resultData.status === undefined) {
      yield put({ type: AT.transactionTxDetailRejected, error: action.payload.txHash });
      return
    }
    
    byHashData = yield call(GET_TRANSACTION_API, action.payload.txHash);
    data = convertEngineToTracker(resultData, byHashData)
    if (data) {
      yield put({ type: AT.transactionTxDetailFulfilled, payload: { data } });
      return
    }
    
    throw Error()
  }
  catch (e) {
    console.error(e)

    if (data) {
      return
    }

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
    if (payload.status === 200) {
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
    const payload = yield call(TRANSACTION_INTERNAL_TX_LIST_API, action.payload.txHash);

    if (payload.status === 200) {
      yield put({ type: AT.transactionInternalTxListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.transactionInternalTxListRejected });
  }
}