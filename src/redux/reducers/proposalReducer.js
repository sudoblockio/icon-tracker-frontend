import actionTypes from '../actionTypes/actionTypes'
import {
    getState
} from 'utils/utils'
import {
    REDUX_STEP,
    INITIAL_STATE
} from 'utils/const'

const initialState = {
    proposalInfo: INITIAL_STATE['OBJ'],
    totalQuorum: INITIAL_STATE['ARR'],
    totalTokenVotes: INITIAL_STATE['ARR'],
}

export function addressesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.proposalInfo: return getState('OBJ', REDUX_STEP.READY, state, action, 'proposalInfo')
        case actionTypes.proposalInfoFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'proposalInfo')
        case actionTypes.proposalInfoRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'proposalInfo')

        case actionTypes.totalQuorum: return getState('ARR', REDUX_STEP.READY, state, action, 'totalQuorum')
        case actionTypes.totalQuorumFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'totalQuorum')
        case actionTypes.totalQuorumRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'totalQuorum')

        case actionTypes.totalTokenVotes: return getState('ARR', REDUX_STEP.READY, state, action, 'totalTokenVotes')
        case actionTypes.totalTokenVotesFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'totalTokenVotes')
        case actionTypes.totalTokenVotesRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'totalTokenVotes')

        default: {
            return state
        }
    }
}
