import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
    selectContractListApi as SELECT_CONTRACT_LIST_API,
} from '../api/restV3_old';

export function* selectContractListFunc(action) {
  try {
    const payload = yield call(SELECT_CONTRACT_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({type: AT.selectContractListFulfilled, payload: payload});
    }
    else {
      throw new Error();
    }
  }
  catch(e) {
    yield put({type: AT.selectContractListRejected, error: e.message});
  }
}

function* watchselectContractList() {
  yield takeLatest(AT.selectContractList, selectContractListFunc)
}

export default function* contractsSaga() {
  yield fork(watchselectContractList);
}
