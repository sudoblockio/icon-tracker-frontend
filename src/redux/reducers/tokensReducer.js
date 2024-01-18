import actionTypes from '../actionTypes/actionTypes'
import { getState } from '../../utils/utils'
import { REDUX_STEP, INITIAL_STATE } from '../../utils/const'

const initialState = {
    tokens: INITIAL_STATE['ARR'],
    tokensSearch: INITIAL_STATE['ARR'],
    recentTokenTx: INITIAL_STATE['ARR'],
    token: INITIAL_STATE['OBJ'],
    tokenTransfers: INITIAL_STATE['ARR'],
    tokenHolders: INITIAL_STATE['ARR'],
}

export function tokensReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.tokenList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'tokens')
        case actionTypes.tokenListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'tokens')
        case actionTypes.tokenListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'tokens')

        case actionTypes.tokenListSearch:
            return getState('ARR', REDUX_STEP.READY, state, action, 'tokensSearch')
        case actionTypes.tokenListSearchFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'tokensSearch')
        case actionTypes.tokenListSearchRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'tokensSearch')

        case actionTypes.tokenTxList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'recentTokenTx')
        case actionTypes.tokenTxListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'recentTokenTx')
        case actionTypes.tokenTxListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'recentTokenTx')

        // Token Summary
        case actionTypes.tokenSummary:
            return getState('OBJ', REDUX_STEP.READY, state, action, 'token')
        case actionTypes.tokenSummaryFulfilled:
            return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'token')
        case actionTypes.tokenSummaryRejected:
            return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'token')

        // Token tx

        // case actionTypes.tokenTransfersList:
        //   return getState("ARR", REDUX_STEP.READY, state, action, "tokenTransfers");
        // case actionTypes.tokenTransfersListFulfilled:
        //   return getState(
        //     "ARR",
        //     REDUX_STEP.FULFILLED,
        //     state,
        //     action,
        //     "tokenTransfers"
        //   );
        // case actionTypes.tokenTransfersListRejected:
        //   return getState(
        //     "ARR",
        //     REDUX_STEP.REJECTED,
        //     state,
        //     action,
        //     "tokenTransfers"
        //   );

        // Token Transfers
        case actionTypes.tokenTransfersList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'tokenTransfers')
        case actionTypes.tokenTransfersListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'tokenTransfers')
        case actionTypes.tokenTransfersListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'tokenTransfers')

        case actionTypes.tokenHoldersList:
            return getState('ARR', REDUX_STEP.READY, state, action, 'tokenHolders')
        case actionTypes.tokenHoldersListFulfilled:
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'tokenHolders')
        case actionTypes.tokenHoldersListRejected:
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'tokenHolders')

        default: {
            return state
        }
    }
}
