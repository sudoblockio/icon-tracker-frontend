import { fork, put, takeLatest, call, all, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import AT from '../actionTypes/actionTypes';

import {
  contractList as CONTRACT_LIST_API,
  contractInfo as CONTRACT_INFO_API,
  contractTxList as CONTRACT_TX_LIST_API,
  contractTokenTxList as CONTRACT_TOKEN_TX_LIST_API,
  contractEventLogList as CONTRACT_EVENT_LOG_LIST_API,
  icxGetScore as ICX_GET_SCORE_API,
  icxCall as ICX_CALL_API
} from '../api/restV3';

export default function* contractsSaga() {
  yield fork(watchContractList);
  yield fork(watchContractInfo);
  yield fork(watchContractTxList);
  yield fork(watchContractTokenTxList);
  yield fork(watchContractEventLogList);
  yield fork(watchIcxGetSrore);
  yield fork(watchIcxCall);
  yield fork(watchReadContractInformation);
}

function* watchContractList() { yield takeLatest(AT.contractList, contractListFunc) }
function* watchContractInfo() { yield takeLatest(AT.contractInfo, contractInfoFunc) }
function* watchContractTxList() { yield takeLatest(AT.contractTxList, contractTxListFunc) }
function* watchContractTokenTxList() { yield takeLatest(AT.contractTokenTxList, contractTokenTxListFunc) }
function* watchContractEventLogList() { yield takeLatest(AT.contractEventLogList, contractEventLogListFunc) }
function* watchIcxGetSrore() { yield takeLatest(AT.icxGetScore, icxGetSroreFunc) }
function* watchIcxCall() { yield takeLatest(AT.icxCall, icxCallFunc) }
function* watchReadContractInformation() { yield takeLatest(AT.readContractInformation, readContractInformationFunc) }

export function* contractListFunc(action) {
  try {
    const payload = yield call(CONTRACT_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.contractListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.contractListRejected });
  }
}

export function* contractInfoFunc(action) {
  try {
    const payload = yield call(CONTRACT_INFO_API, action.payload);
    if (payload.result === '200' && payload.data !== "NO_DATA") {
      yield put({ type: AT.contractInfoFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.contractInfoRejected, error: action.payload.addr });
  }
}

export function* contractTxListFunc(action) {
  try {
    const payload = yield call(CONTRACT_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.contractTxListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.contractTxListRejected });
  }
}

export function* contractTokenTxListFunc(action) {
  try {
    const payload = yield call(CONTRACT_TOKEN_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.contractTokenTxListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.contractTokenTxListRejected });
  }
}

export function* contractEventLogListFunc(action) {
  try {
    const payload = yield call(CONTRACT_EVENT_LOG_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.contractEventLogListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.contractEventLogListRejected });
  }
}

export function* icxGetSroreFunc(action) {
  try {
    const payload = yield call(ICX_GET_SCORE_API, action.payload);
    if (payload.status === 200) {
      yield put({ type: AT.icxGetScoreFulfilled, payload: payload });
    }
    else {
      throw new Error(payload.error);
    }
  }
  catch (e) {
    yield put({ type: AT.icxGetScoreRejected, error: e.message});
  }
}

export function* icxCallFunc(action) {
  try {
    const {
      address,
      params,
      index,
      method
    } = action.payload
    const funcOutputs = yield select(state => state.contracts.contractReadInfo.funcOutputs);
    const outputs = yield call(ICX_CALL_API, {
      from: "hx23ada4a4b444acf8706a6f50bbc9149be1781e13",
      to: address,
      dataType: "call",
      data: {
        method,
        params
      }
    })
    if (outputs.status === 200) {
      const { result } = outputs.data
      const valueArray = Array.isArray(result) ? result : [result]
      funcOutputs[index] = {
        valueArray,
        error: ''
      }
    }
    else {
      const { message } = outputs.error
      funcOutputs[index] = {
        valueArray: [],
        error: message
      }
    }
    const payload = { funcOutputs }
    yield put({ type: AT.icxCallFulfilled, payload })
  }
  catch (e) {
    yield put({ type: AT.icxCallRejected });
  }
}

export function* readContractInformationFunc(action) {
  try {
    const { address } = action.payload
    const score = yield call(ICX_GET_SCORE_API, action.payload);
    const abiData = score.data.result
    const readOnlyFunc = (abiData || []).filter(func => func["type"] === "function" && func["readonly"] === "0x1")
    const funcList = [...readOnlyFunc]
    const _funcOutputs = yield all(readOnlyFunc.map(
      func => {
        if (func["inputs"].length === 0) {
          return call(ICX_CALL_API, {
            from: "hx23ada4a4b444acf8706a6f50bbc9149be1781e13",
            to: address,
            dataType: "call",
            data: {
              method: func["name"]
            }
          })
        }
        else {
          return ''
        }
      }
    ))
    const funcOutputs = []
    _funcOutputs.forEach(output => {
      if (output === '') {
        funcOutputs.push({
          valueArray: [],
          error: ''
        })
      }
      else if (output.status === 200) {
        const { result } = output.data
        const valueArray = Array.isArray(result) ? result : [result]
        funcOutputs.push({
          valueArray,
          error: ''
        })
      }
      else {
        const { message } = output.error
        funcOutputs.push({
          valueArray: [],
          error: message
        })
      }
    })
    const payload = { funcList, funcOutputs }
    yield put({ type: AT.readContractInformationFulfilled, payload })
  }
  catch (e) {
    yield put({ type: AT.readContractInformationRejected })
  }
}