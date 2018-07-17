import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  selectContractInfoApi as SELECT_CONTRACT_INFO_API,
  selectContractTransactionListApi as SELECT_CONTRACT_TRANSACTION_LIST_API,
  selectContractTokenTransferListApi as SELECT_CONTRACT_TOKEN_TRANSFER_LIST_API
} from '../api/restV3';

export function* selectContractInfoFunc(action) {
  try {
    const payload = yield call(SELECT_CONTRACT_INFO_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.selectContractInfoFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.selectContractInfoRejected, error: e.message});
  }
}

export function* selectContractTransactionListFunc(action) {
  try {
    const payload = yield call(SELECT_CONTRACT_TRANSACTION_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.selectContractTransactionListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.selectContractTransactionListRejected, error: e.message});
  }
}

export function* selectContractTokenTransferListFunc(action) {
  try {
    const payload = yield call(SELECT_CONTRACT_TOKEN_TRANSFER_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.selectContractTokenTransferListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.selectContractTokenTransferListRejected, error: e.message});
  }
}

function* watchSelectContractInfo() {
  yield takeLatest(AT.selectContractInfo, selectContractInfoFunc)
}

function* watchSelectContractTransactionList() {
  yield takeLatest(AT.selectContractTransactionList, selectContractTransactionListFunc)
}

function* watchSelectContractTokenTransferList() {
  yield takeLatest(AT.selectContractTokenTransferList, selectContractTokenTransferListFunc)
}

export default function* contractSaga() {
  yield fork(watchSelectContractInfo);
  yield fork(watchSelectContractTransactionList);
  yield fork(watchSelectContractTokenTransferList);
}
