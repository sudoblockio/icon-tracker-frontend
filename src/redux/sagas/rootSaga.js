import { fork } from 'redux-saga/effects'
import blocksSaga from './blocksSaga';

export default function* rootSaga() {
  yield [
    fork(blocksSaga)
  ];
}
