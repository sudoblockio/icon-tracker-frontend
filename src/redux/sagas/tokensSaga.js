import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { 
  tokenGetTokenListApi as TOKEN_GET_TOKEN_LIST_API,
  tokenGetTokenTransferListApi as TOKEN_GET_TOKEN_TRANSFER_LIST_API
} from '../api/restV3_old';

function* tokenGetTokenListFunc(action) {
  try {
    const payload = yield call(TOKEN_GET_TOKEN_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.tokenGetTokenListFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.tokenGetTokenListRejected, error: action.payload});
  }
}

function* tokenGetTokenTransferListFunc(action) {
  try {
    const payload = yield call(TOKEN_GET_TOKEN_TRANSFER_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.tokenGetTokenTransferListFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.tokenGetTokenTransferListRejected});
  }
}

function* watchTokenGetTokenList() {
  yield takeLatest (AT.tokenGetTokenList, tokenGetTokenListFunc)
}

function* watchTokenGetTokenTransferList() {
  yield takeLatest (AT.tokenGetTokenTransferList, tokenGetTokenTransferListFunc)
}

export default function* tokensSaga() {
  yield fork(watchTokenGetTokenList);
  yield fork(watchTokenGetTokenTransferList)
}
