
import { fork, put, takeLatest } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';

function* setAddress(action) {
  try {
    const { payload } = action;
    if (payload) {
      yield put({ type: AT.setAddressSuccess, payload: payload });
    }
  } 
  catch (e) {
    console.log(e)
  }
}

function* clearWallet() {
  try {
    yield put({ type: AT.clearWalletSuccess });
  } 
  catch (e) {
    console.log(e)
  }
}

function* watchSetAddress() {
  yield takeLatest(AT.setAddress, setAddress)
}

function* watchClearWallet() {
  yield takeLatest(AT.clearWallet, clearWallet)
}

export default function* walletSaga() {
  yield fork(watchSetAddress)
  yield fork(watchClearWallet)
}