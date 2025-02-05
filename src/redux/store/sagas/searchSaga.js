import { fork, put, takeLatest, call } from 'redux-saga/effects'
import { routerActions } from 'react-router-redux'
import AT from '../../actionTypes/actionTypes'
import { isHxAddress, isCxAddress, is0xHash, isHash, isNumeric } from '../../../utils/utils'
import { searchContractName } from '../contracts'

function* searchFunc(action) {
    try {
        const { payload } = action
        const commaRemoved = payload.replace(/,/g, '')
        if (!payload) {
            throw new Error()
        } else if (isHxAddress(payload)) {
            yield put(routerActions.push(`/address/${payload}`))
        } else if (isCxAddress(payload)) {
            yield put(routerActions.push(`/contract/${payload}`))
        } else if (is0xHash(payload)) {
            yield put(routerActions.push(`/transaction/${payload}`))
        } else if (isHash(payload)) {
            yield put(routerActions.push(`/transaction/${payload}`))
        } else if (isNumeric(commaRemoved)) {
            yield put(routerActions.push(`/block/${commaRemoved}`))
        } else {

            const searchData = yield call(searchContractName, payload);
            if (!searchData) {
                throw new Error()
            }
            const { data } = searchData;
            const { address } = data ? data[0] : null;

            if (!address) {
                throw new Error()
            }

            yield put(routerActions.push(`/contract/${address}`))
        }
        yield put({ type: AT.searchFulfilled })
    } catch (e) {
        console.log(e);
        yield put({ type: AT.searchRejected, error: action.payload })
        yield put(routerActions.push('/notfound'))
    }
}

function* watchSearch() {
    yield takeLatest(AT.search, searchFunc)
}

export default function* searchSaga() {
    yield fork(watchSearch)
}
