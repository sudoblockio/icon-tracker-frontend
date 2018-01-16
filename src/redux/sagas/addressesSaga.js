import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AT from '../actionTypes/actionTypes';
import {
  getAddressesApi as GET_ADDRESSES_API,
  getAddressDetailApi as GET_ADDRESS_DETAIL_API
 } from '../api/rest';

function* getAddressesFunc(action) {
  try {
    const payload = yield call(GET_ADDRESSES_API, action.payload)
    // yield delay(2000)
    yield put({type: AT.getAddressesFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getAddressesRejected, error: e});
  }
}

function* getAddressDetailFunc(action) {
  try {
    const payload = yield call(GET_ADDRESS_DETAIL_API, action.payload);
    // yield delay(2000)
    yield put({type: AT.getAddressDetailFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getAddressDetailRejected, error: e});
  }
}

function* watchGetAddresses() {
  yield takeLatest(AT.getAddresses, getAddressesFunc)
}

function* watchGetAddressDetail() {
  yield takeLatest(AT.getAddressDetail, getAddressDetailFunc)
}

export default function* addressesSaga() {
  yield fork(watchGetAddresses);
  yield fork(watchGetAddressDetail);
}
