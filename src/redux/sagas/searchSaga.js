import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../actionTypes/actionTypes';
import {
  isHxAddress,
  isCxAddress,
  is0xAddress,
} from '../../utils/utils'
import {
  searchData as SEARCH_DATA_API,
  blockInfo as BLOCK_INFO_API
} from '../api/restV3'

function* searchFunc(action) {
  try {
    const { payload } = action
    if (!payload) {
      throw new Error();
    }
    else if (isHxAddress(payload)) {
      yield put(routerActions.push(`/address/${payload}`));
    }
    else if (isCxAddress(payload)) {
      const result = yield call(SEARCH_DATA_API, { data: action.payload });
      if (result.result === "200") {
        switch (result.data) {
          case 'IRC1':
            yield put(routerActions.push(`/token/${payload}`));
            break
          default:
            yield put(routerActions.push(`/contract/${payload}`));
        }
      }
      else {
        throw new Error();
      }
    }
    else if (is0xAddress(payload)) {
      const result = yield call(SEARCH_DATA_API, { data: action.payload });
      if (result.result === "200") {
        const type = result.data.split(" ")[0]
        switch (type) {
          case 'Transaction':
            yield put(routerActions.push(`/transaction/${payload}`));
            break
          case 'Block':
            const block = yield call(BLOCK_INFO_API, { hash: payload });
            yield put(routerActions.push(`/block/${block.data.height}`));
            break
          default:
            throw new Error();
        }
      }
      else {
        throw new Error();
      }
    }
    else if (!isNaN(payload)) {
      yield put(routerActions.push(`/block/${payload}`));
    }
    else {
      throw new Error();
    }
    yield put({ type: AT.searchFulfilled });
  } catch (e) {
    yield put({ type: AT.searchRejected, error: action.payload });
    yield put(routerActions.push('/notfound'));
  }
}

function* watchSearch() {
  yield takeLatest(AT.search, searchFunc)
}

export default function* searchSaga() {
  yield fork(watchSearch);
}
