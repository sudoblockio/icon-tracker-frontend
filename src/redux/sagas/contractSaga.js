import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
} from '../api/restV3_old';

import {
  contractInfo as CONTRACT_INFO_API,
  contractTxList as CONTRACT_TX_LIST_API,
  contractTokenTxList as CONTRACT_TOKEN_TX_LIST_API,
  icxGetScore as ICX_GET_SCORE_API
} from '../api/restV3';

export function* contractInfoFunc(action) {
  try {
    const payload = yield call(CONTRACT_INFO_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.contractInfoFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.contractInfoRejected, error: e.message});
  }
}

export function* contractTxListFunc(action) {
  try {
    const payload = yield call(CONTRACT_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.contractTxListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.contractTxListRejected, error: e.message});
  }
}

export function* contractTokenTxListFunc(action) {
  try {
    const payload = yield call(CONTRACT_TOKEN_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.contractTokenTxListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.contractTokenTxListRejected, error: e.message});
  }
}

export function* icxGetSroreFunc(action) {
  try {
    const payload = yield call(ICX_GET_SCORE_API, action.payload);
    console.log(payload)
    if (payload.result === '200') {
      yield put({type: AT.icxGetScoreFulfilled, payload: payload});
    }
    else {
      yield put({type: AT.icxGetScoreRejected});
    }
  }
  catch(e) {
    yield put({type: AT.icxGetScoreRejected, error: e.message});
  }
}

function* watchContractInfo() {
  yield takeLatest(AT.contractInfo, contractInfoFunc)
}

function* watchContractTxList() {
  yield takeLatest(AT.contractTxList, contractTxListFunc)
}

function* watchContractTokenTxList() {
  yield takeLatest(AT.contractTokenTxList, contractTokenTxListFunc)
}

function* watchIcxGetSrore() {
  yield takeLatest(AT.icxGetScore, icxGetSroreFunc)
}

export default function* contractSaga() {
  yield fork(watchContractInfo);
  yield fork(watchContractTxList);
  yield fork(watchContractTokenTxList);
  yield fork(watchIcxGetSrore);
}
