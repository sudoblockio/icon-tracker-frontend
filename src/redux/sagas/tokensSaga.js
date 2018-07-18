import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { 
  tokenGetTokenListApi as TOKEN_GET_TOKEN_LIST_API,
} from '../api/restV3_old';
import { 
  tokenTxList as TOKEN_TX_LIST_API
} from '../api/restV3';

function* tokenTxListFunc(action) {
  try {
    const payload = yield call(TOKEN_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.tokenTxListFulfilled, payload: payload});
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({type: AT.tokenTxListRejected});
  }
}

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

function* watchtokenTxList() { yield takeLatest (AT.tokenTxList, tokenTxListFunc) }
function* watchTokenGetTokenList() { yield takeLatest (AT.tokenGetTokenList, tokenGetTokenListFunc) }

export default function* tokensSaga() {
  yield fork(watchtokenTxList)
  yield fork(watchTokenGetTokenList)
}
