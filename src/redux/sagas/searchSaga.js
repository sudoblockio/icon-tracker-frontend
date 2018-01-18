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
      console.log(action.payload)
      const payload = yield call(SEARCH_API, action.payload);
      //payload === 'Block Hash(블록 해쉬)'
      if (payload.result === "OK") {
        switch (payload.data) {
          case 'Block Hash(블록 해쉬)':
            const query = {
              blockHash: action.payload
            }
            const payload = yield call(GET_BLOCK_BY_HASH_API, { payload: query });
            yield put(routerActions.push('/block/' + payload.blockDetail.height));
            break;
          case 'Transaction Hash(트랜잭션 해쉬)':

            break;
          default:
            break;
        }
      }
      if (payload.result === "NO_DATA") {
        yield put({type: AT.searchRejected, error: payload.result});
      }
    } else {
      yield put({type: AT.searchRejected, error: 'NO_DATA'});
    }
    yield put({type: AT.searchFulfilled, payload: ''});
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
