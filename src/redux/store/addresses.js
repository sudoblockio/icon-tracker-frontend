import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'




const ADD_PREFIX= `/v1/addresses`
export const addressListReady = 'ADDRESS_LIST'
export const addressListFulfilled = 'ADDRESS_LIST_FULFILLED'
export const   addressListRejected = 'ADDRESS_LIST_REJECTED'

export const getAddressList = (payload) => ({
    type: addressListReady, 
    payload
})

export const addressList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try {
        const res = await trackerApi.get(`/api${ADD_PREFIX}`)
        console.log(res, "addressList res")
        // if 200
        if (res.status === 200) {
            const data = res.data
            dispatch(getAddressList(data))
            return data
        } else {
            //setError(e)
            // handle error from get
        }
        // error
    } catch (e) {
        // if no tracker api url
        console.log(e)
    }
}

const initialState = {
    addresses: INITIAL_STATE['ARR'],
    wallet: INITIAL_STATE['OBJ'],
    walletTx: INITIAL_STATE['ARR'],
    addressInternalTx: INITIAL_STATE['ARR'],
    walletTokenTx: INITIAL_STATE['ARR'],
    addressDelegation: INITIAL_STATE['ARR'],
    addressVoted: INITIAL_STATE['ARR'],
    addressReward: INITIAL_STATE['ARR'],
  }

  let newState;

  const addressesReducer = (state = initialState, action) => {
      switch(action.type) {
          case addressListReady : {
            newState = deepcopy(state)
            newState.addresses.data = action.payload
            return getState('ARR', REDUX_STEP.READY, newState, action, 'addresses')
          }
          default:
              return state;
      }
  }

  export default addressesReducer;