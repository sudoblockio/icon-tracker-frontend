import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { searchApi as SEARCH_API } from '../api/rest'

function* searchFunc(action) {
  try {
    const payload = yield call(SEARCH_API);
    if (payload.result === "NO_DATA") {

    }

    //yield put({type: AT.searchFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.searchRejected, error: e});
  }
}

function* watchSearch() {
  yield takeLatest(AT.search, searchFunc)
}

export default function* searchSaga() {
  yield fork(watchSearch);
}
