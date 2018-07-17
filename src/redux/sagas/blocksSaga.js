import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  blockListApi as BLOCK_LIST_API,
  blockInfoApi as BLOCK_INFO_API,
  blockTxListApi as BLOCK_TX_LIST_API
} from '../api/restV3_old';

function* blockListFunc(action) {
  try {
    const payload = yield call(BLOCK_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.blockListFulfilled, payload: payload});
    } else {
      yield put({type: AT.blockListRejected});
    }
  } catch (e) {
    yield put({type: AT.blockListRejected});
  }
}

function* blockInfoFunc(action) {
  try {
    const payload = yield call(BLOCK_INFO_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.blockInfoFulfilled, payload: payload});
    } else {
      yield put({type: AT.blockInfoRejected});
    }
  } catch (e) {
    yield put({type: AT.blockInfoRejected});
  }
}

function* blockTxListFunc(action) {
  try {
    const payload = yield call(BLOCK_TX_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.blockTxListFulfilled, payload: payload});
    } else {
      yield put({type: AT.blockTxListRejected});
    }
  } catch (e) {
    yield put({type: AT.blockTxListRejected});
  }
}

function* watchBlockList() {
  yield takeLatest(AT.blockList, blockListFunc)
}

function* watchBlockInfo() {
  yield takeLatest(AT.blockInfo, blockInfoFunc)
}

function* watchBlockTxList() {
  yield takeLatest(AT.blockTxList, blockTxListFunc)
}

export default function* blocksSaga() {
  yield fork(watchBlockList)
  yield fork(watchBlockInfo);
  yield fork(watchBlockTxList);
}
