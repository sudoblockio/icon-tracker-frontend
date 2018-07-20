import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';

import {
  contractList as CONTRACT_LIST_API,
  contractInfo as CONTRACT_INFO_API,
  contractTxList as CONTRACT_TX_LIST_API,
  contractTokenTxList as CONTRACT_TOKEN_TX_LIST_API,
  icxGetScore as ICX_GET_SCORE_API
} from '../api/restV3';

export default function* contractSaga() {
  yield fork(watchContractList);
  yield fork(watchContractInfo);
  yield fork(watchContractTxList);
  yield fork(watchContractTokenTxList);
  yield fork(watchIcxGetSrore);
}

function* watchContractList() { yield takeLatest(AT.contractList, contractListFunc) }
function* watchContractInfo() { yield takeLatest(AT.contractInfo, contractInfoFunc) }
function* watchContractTxList() { yield takeLatest(AT.contractTxList, contractTxListFunc) }
function* watchContractTokenTxList() { yield takeLatest(AT.contractTokenTxList, contractTokenTxListFunc) }
function* watchIcxGetSrore() { yield takeLatest(AT.icxGetScore, icxGetSroreFunc) }

export function* contractListFunc(action) {
  try {
    const payload = yield call(CONTRACT_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.contractListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.contractListRejected});
  }
}

export function* contractInfoFunc(action) {
  try {
    const payload = yield call(CONTRACT_INFO_API, action.payload);
    if (payload.result === '200' && payload.data !== "NO_DATA") {
      yield put({type: AT.contractInfoFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.contractInfoRejected, error: action.payload.addr});
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
    yield put({type: AT.contractTxListRejected});
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
    yield put({type: AT.contractTokenTxListRejected});
  }
}

// TODO 서버 이슈 해결 뒤 다시 확인
// response_code 처리
export function* icxGetSroreFunc(action) {
  try {
    const payload = yield call(ICX_GET_SCORE_API, action.payload);
    if (payload.response_code === 0) {
      yield put({type: AT.icxGetScoreFulfilled, payload: payload.response});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.icxGetScoreRejected});
  }
}