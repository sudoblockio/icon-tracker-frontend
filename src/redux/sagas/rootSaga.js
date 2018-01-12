import { fork } from 'redux-saga/effects'
import mainPageSaga from './mainPageSaga'

export default function* rootSaga() {
  yield [
    fork(mainPageSaga)
  ];
}
