import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../actionTypes/actionTypes';
import {
  searchApi as SEARCH_API,
  getBlockByHashApi as GET_BLOCK_BY_HASH_API } from '../api/rest'
import { getBlockFunc, getAddressDetailFunc } from './blocksSaga';

function* searchFunc(action) {
  try {
    // 검색어가 숫자면, 블록 height로 검색
    if (!isNaN(action.payload)) {
      yield put(routerActions.push('/block/' + action.payload));

    // 검색어가 길이 40개의 string이면 지갑 ID 검색
    } else if (action.payload.length === 40) {
      yield put(routerActions.push('/wallet/' + action.payload));

    // 그 이외는 HASH (TX, BLOCK) 구분을 위한 검색
    } else if (action.payload.length === 64){
      const searchPayload = yield call(SEARCH_API, action.payload);
      if (searchPayload.result === "OK") {
        switch (searchPayload.data.split(" ")[0]) {
          // Block Hash일 경우 Block Height을 가져와서 라우터에 Push.
          case 'Block': {
            const query = {
               hash: action.payload
            }
            const blockPayload = yield call(GET_BLOCK_BY_HASH_API, query);
            yield put(routerActions.push('/block/' + blockPayload.blockDetail.height));
            break;
          }
          // Transaction Hash일 경우 바로 라우터에 Push.
          case 'Transaction': {
            yield put(routerActions.push('/transaction/' + action.payload));
            break;
          }
          default:
            break;
        }
      }
      if (searchPayload.result === "NO_DATA") {
        throw '';
      }
    } else {
      throw '';
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
