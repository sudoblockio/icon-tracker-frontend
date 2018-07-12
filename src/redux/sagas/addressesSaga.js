import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  getAddressesApi as GET_ADDRESSES_API,
  // getAddressDetailApi as GET_ADDRESS_DETAIL_API
} from '../api/rest';

import {
  addressInfoApi as ADDRESS_INFO_API,
  addressTxListApi as ADDRESS_TX_LIST,
  addressTokenTxListApi as ADDRESS_TOKEN_TX_LIST,
} from '../api/restV3';

function* getAddressesFunc(action) {
  try {
    const payload = yield call(GET_ADDRESSES_API, action.payload)
    if (payload.result === '200') {
      yield put({type: AT.getAddressesFulfilled, payload: payload});
    }
    else {
      yield put({type: AT.getAddressesRejected});
    }
  } catch (e) {
    yield put({type: AT.getAddressesRejected});
  }
}

// export function* getAddressDetailFunc(action) {
//   try {
//     const payload = yield call(GET_ADDRESS_DETAIL_API, action.payload);
//     if (payload.result === '200') {
//       yield put({type: AT.getAddressDetailFulfilled, payload: payload});
//     }
//     else {
//       throw new Error();
//     }
//   } catch (e) {
//     yield put({type: AT.getAddressDetailRejected, error: action.payload.addressId});
//   }
// }

function* watchGetAddresses() {
  yield takeLatest(AT.getAddresses, getAddressesFunc)
}

// function* watchGetAddressDetail() {
//   yield takeLatest(AT.getAddressDetail, getAddressDetailFunc)
// }


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
  yield fork(watchGetAddresses);
  // yield fork(watchGetAddressDetail);
  yield fork(watchAddressInfo);
  yield fork(watchAddressTxList);
  yield fork(watchAddressTokenTxList);
}
