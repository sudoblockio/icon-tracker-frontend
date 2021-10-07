import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../actionTypes/actionTypes';
import {
  isHxAddress,
  isCxAddress,
  is0xHash,
  isHash,
  isNumeric
} from '../../utils/utils'
import {
  IRC_VERSION
} from '../../utils/const'
import {
  // searchData as SEARCH_DATA_API,
  blockInfo as BLOCK_INFO_API
} from '../store/blocks'
import { searchBlocks as SEARCH_DATA_API} from '../store/search'

function* searchFunc(action) {
  try {
    const { payload } = action
    const commaRemoved = payload.replace(/,/g, "")
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
          case IRC_VERSION[1]:
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
    else if (is0xHash(payload)) {
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
    else if (isHash(payload)) {
      yield put(routerActions.push(`/transaction/${payload}`));
    }
    else if (isNumeric(commaRemoved)) {    
      yield put(routerActions.push(`/block/${commaRemoved}`));
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
