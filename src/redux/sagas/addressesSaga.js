import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  addressListApi as ADDRESS_LIST_API,
  addressInfoApi as ADDRESS_INFO_API,
  addressTxListApi as ADDRESS_TX_LIST,
  addressTokenTxListApi as ADDRESS_TOKEN_TX_LIST,
} from '../api/restV3';

export function* addressListFunc(action) {
  try {
    const payload = yield call(ADDRESS_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.addressListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.addressListRejected, error: e.message});
  }
}

export function* addressInfoFunc(action) {
  try {
    const payload = yield call(ADDRESS_INFO_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.addressInfoFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.addressInfoRejected, error: action.payload.address});
  }
}

export function* addressTxListFunc(action) {
  try {
    const payload = yield call(ADDRESS_TX_LIST, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.addressTxListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.addressTxListRejected, error: action.payload.address});
  }
}

export function* addressTokenTxListFunc(action) {
  try {
    const payload = yield call(ADDRESS_TOKEN_TX_LIST, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.addressTokenTxListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.addressTokenTxListRejected, error: action.payload.address});
  }
}

function* watchAddressList() {
  yield takeLatest(AT.addressList, addressListFunc)
}

function* watchAddressInfo() {
  yield takeLatest(AT.addressInfo, addressInfoFunc)
}

function* watchAddressTxList() {
  yield takeLatest(AT.addressTxList, addressTxListFunc)
}

function* watchAddressTokenTxList() {
  yield takeLatest(AT.addressTokenTxList, addressTokenTxListFunc)
}

export default function* addressesSaga() {
  yield fork(watchAddressList);
  yield fork(watchAddressInfo);
  yield fork(watchAddressTxList);
  yield fork(watchAddressTokenTxList);
}
