
import { fork, put, takeLatest } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';

function* setWalletAddress(action) {
    try {
      const { payload } = action;
      if (payload) {
        console.log(payload)
        yield put({ type: AT.setWalletAddressSuccess, payload: payload });
      } else {
        throw new Error();
      }
    } catch (e) {
        console.log(e)
    }
  }
function* clearWalletAddress(){
    try{
        yield put({ type: AT.clearWalletAddressSuccess });
    }catch(e){
        console.log(e)
    }
}

function* watchSetWalletAddress() {
    yield takeLatest(AT.setWalletAddress, setWalletAddress)
    yield takeLatest(AT.clearWalletAddress, clearWalletAddress)
}

export default function* walletAddressSaga() {
    yield fork(watchSetWalletAddress)
}