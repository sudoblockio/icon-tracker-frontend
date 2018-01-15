import { fork } from 'redux-saga/effects';
import mainPageSaga from './mainPageSaga';
import addressesSaga from './addressesSaga';
import blocksSaga from './blocksSaga';
import transactionsSaga from './transactionsSaga';


export default function* rootSaga() {
  yield [
    fork(mainPageSaga),
    fork(addressesSaga),
    fork(blocksSaga),
    fork(transactionsSaga)
  ];
}
