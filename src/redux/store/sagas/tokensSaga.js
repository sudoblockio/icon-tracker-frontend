import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../../actionTypes/actionTypes';
import {
  tokenList as TOKEN_LIST_API,
  tokenTxList as TOKEN_TX_LIST_API,
  tokenSummary as TOKEN_SUMMARY_API,
  tokenTransfersList as TOKEN_TRANSFERS_LIST_API,
  tokenHoldersList as TPKEN_HOLDERS_LIST_API
} from '../../api/restV3';

function* watchTokenList() { yield takeLatest(AT.tokenList, tokenListFunc) }
function* watchTokenListSearch() { yield takeLatest(AT.tokenListSearch, tokenListSearchFunc) }
function* watchTokenTxList() { yield takeLatest(AT.tokenTxList, tokenTxListFunc) }
function* watchTokenSummary() { yield takeLatest(AT.tokenSummary, tokenSummaryFunc) }
function* watchTokenTransfersList() { yield takeLatest(AT.tokenTransfersList, tokenTransfersListFunc) }
function* watchTokenHoldersList() { yield takeLatest(AT.tokenHoldersList, tokenHoldersListFunc) }

export default function* tokensSaga() {
  yield fork(watchTokenList)
  yield fork(watchTokenListSearch)
  yield fork(watchTokenTxList)
  yield fork(watchTokenSummary)
  yield fork(watchTokenTransfersList)
  yield fork(watchTokenHoldersList)
}

function* tokenListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.tokenListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TOKEN_LIST_API, action.payload);
    if (payload.status === 200) {
      yield put({ type: AT.tokenListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenListRejected });
  }
}

function* tokenListSearchFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.tokenListSearchFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TOKEN_LIST_API, action.payload);
    if (payload.result === '200' || 'NO Data') {
      yield put({ type: AT.tokenListSearchFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenListSearchRejected });
  }
}

function* tokenTxListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.tokenTxListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TOKEN_TX_LIST_API, action.payload);
    console.log(payload, "token tx payload")
    if (payload.status === 200) {
      yield put({ type: AT.tokenTxListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenTxListRejected });
  }
}

function* tokenSummaryFunc(action) {
  try {
    const payload = yield call(TOKEN_SUMMARY_API, action.payload);
    if (payload.status === 200) {
      yield put({ type: AT.tokenSummaryFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenSummaryRejected, error: action.payload.contractAddr });
  }
}

function* tokenTransfersListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.tokenTransfersListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TOKEN_TRANSFERS_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.tokenTransfersListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenTransfersListRejected });
  }
}

function* tokenHoldersListFunc(action) {
  try {
    if (action.payload.count === 0) {
      yield put({ type: AT.tokenHoldersListFulfilled, payload: { data: [] } });
      return
    }

    const payload = yield call(TPKEN_HOLDERS_LIST_API, action.payload);
    if (payload.result === '200') {
      yield put({ type: AT.tokenHoldersListFulfilled, payload: payload });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({ type: AT.tokenHoldersListRejected });
  }
}