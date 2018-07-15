import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { 
  tokenGetTokenListApi as TOKEN_GET_TOKEN_LIST_API
} from '../api/restV3';

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

function* watchTokenGetTokenList() {
  yield takeLatest (AT.tokenGetTokenList, tokenGetTokenListFunc)
}

export default function* tokensSaga() {
  yield fork(watchTokenGetTokenList);
}
