import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../actionTypes/actionTypes';
import {
  getBlocksApi as GET_BLOCKS_API,
  getBlockApi as GET_BLOCK_API
} from '../api/rest';

function* getBlocksFunc(action) {
  try {
    const payload = yield call(GET_BLOCKS_API, action.payload);
    console.log(payload.result)
    if (payload.result === 'OK') {
      yield put({type: AT.getBlocksFulfilled, payload: payload});
    } else {
      yield put({type: AT.getBlocksRejected});
    }
  } catch (e) {
    yield put({type: AT.getBlocksRejected});
  }
}

export function* getBlockFunc(action) {
  try {
    const payload = yield call(GET_BLOCK_API, action.payload);
    if (payload.result === 'OK') {
      yield put({type: AT.getBlockFulfilled, payload: payload.data});
    } else {
      throw '';
    }
  } catch (e) {
    yield put({type: AT.getBlockRejected, error: action.payload.blockId});
  }
}

function* watchGetBlocks() {
  yield takeLatest(AT.getBlocks, getBlocksFunc)
}

function* watchGetBlock() {
  yield takeLatest(AT.getBlock, getBlockFunc)
}

export default function* blocksSaga() {
 yield fork(watchGetBlocks);
 yield fork(watchGetBlock);
}
