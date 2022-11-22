import {fork, put, takeLatest} from 'redux-saga/effects'
import AT from '../../actionTypes/actionTypes';

function* setAddress(action) {
  try {
    const {payload} = action;
    if (payload) {
      yield put({type: AT.setAddressSuccess, payload});
    }
  } catch (e) {
    console.log(e)
  }
}

function* setNotification(action) {
  try {
    const {payload} = action;
    yield put({type: AT.setNotificationSuccess, payload});
  } catch (e) {
    console.log(e)
  }
}

function* clearWallet() {
  try {
    yield put({type: AT.clearWalletSuccess});
  } catch (e) {
    console.log(e)
  }
}

function* watchSetAddress() {
  yield takeLatest(AT.setAddress, setAddress)
}

function* watchSetNotification() {
  yield takeLatest(AT.setNotification, setNotification)
}

function* watchClearWallet() {
  yield takeLatest(AT.clearWallet, clearWallet)
}

export default function* walletSaga() {
  yield fork(watchSetAddress)
  yield fork(watchSetNotification)
  yield fork(watchClearWallet)
}