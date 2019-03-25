
import { fork, put, takeLatest } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';

function* setWalletAddress(action) {
    try {
      const { payload } = action;
      if (payload) {
        yield put({ type: AT.setWalletAddress, payload: payload });
      } else {
        throw new Error();
      }
    } catch (e) {
        console.log(e)
    }
  }

function* watchWalletAddress() {
    yield takeLatest(AT.setWalletAddress, setWalletAddress)
}

export default function* walletAddress() {
    yield fork(watchWalletAddress)
}