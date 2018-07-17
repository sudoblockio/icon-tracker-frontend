import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from '../actionTypes/actionTypes';
import {
    tokenGetTokenSummaryApi as TOKEN_GET_TOKEN_SUMMARY_API,
    tokenGetTokenTransfersApi as TOKEN_GET_TOKEN_TRANSFERS_API,
    tokenGetTokenHoldersApi as TOKEN_GET_TOKEN_HOLDERS_API
} from '../api/restV3';

function* tokenGetTokenSummaryFunc(action) {
    try {
        const payload = yield call(TOKEN_GET_TOKEN_SUMMARY_API, action.payload);
        if (payload.result === '200') {
            yield put({ type: AT.tokenGetTokenSummaryFulfilled, payload: payload });
        } else {
            yield put({ type: AT.tokenGetTokenSummaryRejected, error: action.payload.contractAddr });
        }
    } catch (e) {
        yield put({ type: AT.tokenGetTokenSummaryRejected, error: action.payload.contractAddr });
    }
}

function* tokenGetTokenTransfersFunc(action) {
    try {
        const payload = yield call(TOKEN_GET_TOKEN_TRANSFERS_API, action.payload);
        if (payload.result === '200') {
            yield put({ type: AT.tokenGetTokenTransfersFulfilled, payload: payload });
        } else {
            yield put({ type: AT.tokenGetTokenTransfersRejected, error: action.payload.contractAddr });
        }
    } catch (e) {
        yield put({ type: AT.tokenGetTokenTransfersRejected, error: action.payload.contractAddr });
    }
}

function* tokenGetTokenHoldersFunc(action) {
    try {
        const payload = yield call(TOKEN_GET_TOKEN_HOLDERS_API, action.payload);
        if (payload.result === '200') {
            yield put({ type: AT.tokenGetTokenHoldersFulfilled, payload: payload });
        } else {
            yield put({ type: AT.tokenGetTokenHoldersRejected, error: action.payload.contractAddr });
        }
    } catch (e) {
        yield put({ type: AT.tokenGetTokenHoldersRejected, error: action.payload.contractAddr });
    }
}

function* watchTokenGetTokenSummary() {
    yield takeLatest(AT.tokenGetTokenSummary, tokenGetTokenSummaryFunc)
}

function* watchTokenGetTokenTransfers() {
    yield takeLatest(AT.tokenGetTokenTransfers, tokenGetTokenTransfersFunc)
}

function* watchTokenGetTokenHolders() {
    yield takeLatest(AT.tokenGetTokenHolders, tokenGetTokenHoldersFunc)
}

export default function* tokenSaga() {
    yield fork(watchTokenGetTokenSummary)
    yield fork(watchTokenGetTokenTransfers)
    yield fork(watchTokenGetTokenHolders)
}
