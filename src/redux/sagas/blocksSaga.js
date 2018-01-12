import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import { getBlocksApi as GET_BLOCKS_API } from '../api/rest';

function* getBlocksFunc(action) {
  try {
    const payload = yield call(GET_BLOCKS_API, action.payload);
    yield put({type: AT.getBlocksFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getBlocksRejected, error: e});
  }
}

function* watchGetBlocks() {
  yield takeLatest(AT.getBlocks, getBlocksFunc)
}

export default function* blocksSaga() {
 yield fork(watchGetBlocks);
}
