import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
    reportScam as REPORT_ADDRESS_API
} from '../api/restV3';

export default function* reportSaga() {
    yield fork(watchreportScam);  
}

function* watchreportScam() { yield takeLatest(AT.reportScam,reportScamFunc) }

export function* reportScamFunc(action) {
    try {
      const payload = yield call(REPORT_ADDRESS_API, action.payload);
      if (payload.result === "200") {
        yield put({ type: AT.reportScamFulfilled});
        return
      }
      else {
        throw new Error();
      }
    }
    catch(e) {
      yield put({type: AT.reportScamRejected});
    }
}
  