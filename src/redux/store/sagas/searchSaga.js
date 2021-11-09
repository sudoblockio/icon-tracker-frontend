import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../../actionTypes/actionTypes';
import {
  isHxAddress,
  isCxAddress,
  is0xHash,
  isHash,
  isNumeric
} from '../../../utils/utils'
import {
  IRC_VERSION
} from '../../../utils/const'
import {
  searchData as SEARCH_DATA_API,
  blockInfo as BLOCK_INFO_API
} from '../../store/search'

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
      yield put(routerActions.push(`/contract/${payload}`))
    }
    else if (is0xHash(payload)) {
      yield put(routerActions.push(`/transaction/${payload}`));
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
