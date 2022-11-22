import {fork, put, takeLatest} from 'redux-saga/effects'
import {routerActions} from 'react-router-redux'
import AT from '../../actionTypes/actionTypes';
import {
  isHxAddress,
  isCxAddress,
  is0xHash,
  isHash,
  isNumeric
} from '../../../utils/utils'

function* searchFunc(action) {

  try {
    const {payload} = action
    const commaRemoved = payload.replace(/,/g, "")
    if (!payload) {
      throw new Error();
    } else if (isHxAddress(payload)) {

      yield put(routerActions.push(`/address/${payload}`));
    } else if (isCxAddress(payload)) {
      yield put(routerActions.push(`/contract/${payload}`))
    } else if (is0xHash(payload)) {
      yield put(routerActions.push(`/transaction/${payload}`));
    } else if (isHash(payload)) {
      yield put(routerActions.push(`/transaction/${payload}`));
    } else if (isNumeric(commaRemoved)) {

      yield put(routerActions.push(`/block/${commaRemoved}`));
    } else {
      throw new Error();
    }
    yield put({type: AT.searchFulfilled});
  } catch (e) {

    yield put({type: AT.searchRejected, error: action.payload});
    yield put(routerActions.push('/notfound'));
  }
}

function* watchSearch() {
  yield takeLatest(AT.search, searchFunc)
}

export default function* searchSaga() {
  yield fork(watchSearch);
}
