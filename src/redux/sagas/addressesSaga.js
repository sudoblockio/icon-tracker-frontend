import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { routerActions } from 'react-router-redux'
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
    yield put({type: AT.getAddressesRejected});
  }
}

export function* getAddressDetailFunc(action) {
  try {
    const payload = yield call(GET_ADDRESS_DETAIL_API, action.payload);
    if (payload.result === 'OK') {
      yield put({type: AT.getAddressDetailFulfilled, payload: payload});
    } else {
      throw '';
    }
  } catch (e) {
    yield put(routerActions.push({
      pathname: '/notfound',
      state: {
        error: action.payload.address
      }
    }));
    yield put({type: AT.getAddressDetailRejected});
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
