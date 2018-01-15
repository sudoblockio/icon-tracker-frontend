import { fork } from 'redux-saga/effects';
import mainPageSaga from './mainPageSaga';
import blocksSaga from './blocksSaga';
import transactionsSaga from './transactionsSaga';

export default function* rootSaga() {
  yield [
    fork(mainPageSaga),
    fork(blocksSaga),
    fork(transactionsSaga)
  ];
}
