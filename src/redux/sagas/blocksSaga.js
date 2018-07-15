import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  getBlocksApi as GET_BLOCKS_API,
} from '../api/rest';

import {
  blockInfoApi as BLOCK_INFO_API,
  blockTxListApi as BLOCK_TX_LIST_API
} from '../api/restV3';


function* getBlocksFunc(action) {
  try {
    const payload = yield call(GET_BLOCKS_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.getBlocksFulfilled, payload: payload});
    } else {
      yield put({type: AT.getBlocksRejected});
    }
  } catch (e) {
    yield put({type: AT.getBlocksRejected});
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

function* watchGetBlocks() {
  yield takeLatest(AT.getBlocks, getBlocksFunc)
}

function* watchBlockInfo() {
  yield takeLatest(AT.blockInfo, blockInfoFunc)
}

function* watchBlockTxList() {
  yield takeLatest(AT.blockTxList, blockTxListFunc)
}

export default function* blocksSaga() {
  yield fork(watchGetBlocks);
  yield fork(watchBlockInfo);
  yield fork(watchBlockTxList);
}
