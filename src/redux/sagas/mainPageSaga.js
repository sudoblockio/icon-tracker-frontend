import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
  getMainInfo as GET_MAIN_INFO_API,
  getMainChart as GET_MAIN_CHART_API,
 } from '../api/rest'

function* getMainInfo() {
  try {
    const payload = yield call(GET_MAIN_INFO_API);
    yield put({type: AT.getMainInfoFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getMainInfoRejected});
  }
}

function* getMainChart() {
  try {
    const payload = yield call(GET_MAIN_CHART_API);
    yield put({type: AT.getMainChartFulfilled, payload: payload});
  } catch (e) {
    yield put({type: AT.getMainChartRejected});
  }
}

function* watchGetMainInfo() {
  yield takeLatest(AT.getMainInfo, getMainInfo)
}

function* watchGetMainChart() {
  yield takeLatest(AT.getMainChart, getMainChart)
}

export default function* mainPageSaga() {
  yield fork(watchGetMainInfo);
  yield fork(watchGetMainChart);
}
