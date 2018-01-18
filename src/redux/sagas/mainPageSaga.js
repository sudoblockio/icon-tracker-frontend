import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AT from '../actionTypes/actionTypes';
import { getMainInfo as GET_MAIN_INFO_API } from '../api/rest'

function* getMainInfo(action) {
  try {
    const payload = yield call(GET_MAIN_INFO_API);
    yield put({type: AT.getMainInfoFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getMainInfoRejected, error: e});
  }
}

function* watchGetMainInfo() {
  yield takeLatest(AT.getMainInfo, getMainInfo)
}

export default function* mainPageSaga() {
  yield fork(watchGetMainInfo);
}
