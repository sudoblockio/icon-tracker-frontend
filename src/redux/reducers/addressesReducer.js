import actionTypes from '../actionTypes/actionTypes'
import {
  getState
} from 'utils/utils'
import {
  REDUX_STEP,
  INITIAL_STATE
} from 'utils/const'

const initialState = {
  addresses: INITIAL_STATE['ARR'],
  wallet: INITIAL_STATE['OBJ'],
  walletTx: INITIAL_STATE['ARR'],
  addressInternalTx: INITIAL_STATE['ARR'],
  walletTokenTx: INITIAL_STATE['ARR'],
  addressDelegation: INITIAL_STATE['ARR'],
}

export function addressesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.addressList: return getState('ARR', REDUX_STEP.READY, state, action, 'addresses') 
    case actionTypes.addressListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addresses') 
    case actionTypes.addressListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addresses') 

    case actionTypes.addressInfo: return getState('OBJ', REDUX_STEP.READY, state, action, 'wallet') 
    case actionTypes.addressInfoFulfilled: return getState('OBJ', REDUX_STEP.FULFILLED, state, action, 'wallet') 
    case actionTypes.addressInfoRejected: return getState('OBJ', REDUX_STEP.REJECTED, state, action, 'wallet') 

    case actionTypes.addressTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'walletTx') 
    case actionTypes.addressTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'walletTx') 
    case actionTypes.addressTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'walletTx') 

    case actionTypes.addressInternalTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'addressInternalTx') 
    case actionTypes.addressInternalTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressInternalTx') 
    case actionTypes.addressInternalTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressInternalTx')

    case actionTypes.addressTokenTxList: return getState('ARR', REDUX_STEP.READY, state, action, 'walletTokenTx') 
    case actionTypes.addressTokenTxListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'walletTokenTx') 
    case actionTypes.addressTokenTxListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'walletTokenTx')

    case actionTypes.addressDelegationList: return getState('ARR', REDUX_STEP.READY, state, action, 'addressDelegation') 
    case actionTypes.addressDelegationListFulfilled: return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'addressDelegation') 
    case actionTypes.addressDelegationListRejected: return getState('ARR', REDUX_STEP.REJECTED, state, action, 'addressDelegation')

    default: {
      return state
    }
  }
}
