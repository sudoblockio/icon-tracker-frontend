import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  getDelegation as ADDRESS_DELEGATION_LIST,
  addressList as ADDRESS_LIST_API,
  addressInfo as ADDRESS_INFO_API,
  addressTxList as ADDRESS_TX_LIST,
  addressInternalTxList as ADDRESS_INTERNAL_TX_LIST,
  addressTokenTxList as ADDRESS_TOKEN_TX_LIST,
  getPRepList,
} from '../api/restV3';

export default function* addressesSaga() {
  yield fork(watchAddressDelegationList);
  yield fork(watchAddressList);
  yield fork(watchAddressInfo);
  yield fork(watchAddressTxList);
  yield fork(watchAddressInternalTxList);
  yield fork(watchAddressTokenTxList);
}

function* watchAddressDelegationList() { yield takeLatest(AT.addressDelegationList, addressDelegationListFunc) }
function* watchAddressList() { yield takeLatest(AT.addressList, addressListFunc) }
function* watchAddressInfo() { yield takeLatest(AT.addressInfo, addressInfoFunc) }
function* watchAddressTxList() { yield takeLatest(AT.addressTxList, addressTxListFunc) }
function* watchAddressInternalTxList() { yield takeLatest(AT.addressInternalTxList, addressInternalTxListFunc) }
function* watchAddressTokenTxList() { yield takeLatest(AT.addressTokenTxList, addressTokenTxListFunc) }

export function* addressDelegationListFunc(action) {
  try {
    const { address } = action.payload
    const payload = yield call(ADDRESS_DELEGATION_LIST, address);
    const { delegations } = payload
    if (delegations) {
      const { preps } = yield call(getPRepList)
      const data = delegations.map(prep => {
        const { address, value } = prep
        const searched = { ...preps.filter(p => p.address === address)[0] }
        searched.value = value
        return searched
      })

      yield put({ type: AT.addressDelegationListFulfilled, payload: { 
        data,
        listSize: data.length,
        totalSize: data.length
      }});
    }
    else {
      throw new Error()
    }
  }
  catch (e) {
    yield put({ type: AT.addressDelegationListRejected });
  }
}

export function* addressListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.addressListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(ADDRESS_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.addressListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.addressListRejected });
  }
}

export function* addressInfoFunc(action) {
  try {
    const payload = yield call(ADDRESS_INFO_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.addressInfoFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.addressInfoRejected, error: action.payload.address });
  }
}

export function* addressTxListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.addressTxListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(ADDRESS_TX_LIST, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.addressTxListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.addressTxListRejected });
  }
}

export function* addressInternalTxListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.addressInternalTxListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(ADDRESS_INTERNAL_TX_LIST, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.addressInternalTxListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.addressInternalTxListRejected });
  }
}

export function* addressTokenTxListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.addressTokenTxListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(ADDRESS_TOKEN_TX_LIST, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.addressTokenTxListFulfilled, payload: payload });
    }
    else {
      throw new Error();
    }
  }
  catch (e) {
    yield put({ type: AT.addressTokenTxListRejected });
  }
}

