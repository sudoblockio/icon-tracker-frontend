import { all, fork } from 'redux-saga/effects';
import mainPageSaga from './mainPageSaga';
import addressesSaga from './addressesSaga';
import blocksSaga from './blocksSaga';
import transactionsSaga from './transactionsSaga';
import searchSaga from './searchSaga';
import tokensSaga from './tokensSaga'
import contractsSaga from './contractsSaga'

export default function* rootSaga() {
  yield all([
    fork(mainPageSaga),
    fork(addressesSaga),
    fork(blocksSaga),
    fork(transactionsSaga),
    fork(searchSaga),
    fork(tokensSaga),
    fork(contractsSaga),
  ]);
}