import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const CX_PREFIX = `/v1/contracts`;

export const SELECT_CONTRACT_LIST = 'SELECT_CONTRACT_LIST';
export const SELECT_CONTRACT_LIST_FULFILLED = 'SELECT_CONTRACT_LIST_FULFILLED';
export const SELECT_CONTRACT_LIST_REJECTED = 'SELECT_CONTRACT_LIST_REJECTED';

export const CONTRACT_INFO = 'CONTRACT_INFO'
export const CONTRACT_INFO_FULFILLED =  'CONTRACT_INFO_FULFILLED'
export const CONTRACT_INFO_REJECTED = 'CONTRACT_INFO_REJECTED'

const getContractList = (payload) => ({
    type: SELECT_CONTRACT_LIST,
    payload
});

const getContractListInfo = (payload) => ({
  type: CONTRACT_INFO,
  payload
});

export const contractList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
        const res = await trackerApi.get(makeUrl(`${CX_PREFIX}`, payload))

        if (res.status === 200) {
            const data = res.data
            dispatch(getContractList(data))
            return data
        } else {
            // handle error
        }
    } catch (e) {
        // if no tracker api url
        console.log(e)
    }
}

export const contractInfo = (payload) => async (dispatch) => {
  console.log(payload, "contract info payload")
  const trackerApi = await trackerApiInstance();
  payload.addr ? payload = payload.addr : payload = payload
  console.log(payload, "le payload")
  try {
    console.log(payload, "made it to hag")
      const res = await trackerApi.get(`/api/v1/contracts/${payload}`)
      console.log(res, "res from contracts")
      if (res.data) {
          const data = res.data
          console.log(data, "data contract ")
          dispatch(getContractListInfo(data))
          return data
      } else {
          console.log(res, "didn't work")
      }
  } catch (e) {
      console.log(e)
  }
}


const initialState = {
    contracts: INITIAL_STATE['ARR'],
    contractsSearch: INITIAL_STATE['ARR'],
    contract: INITIAL_STATE['OBJ'],
    contractDetail: INITIAL_STATE['OBJ'],
    contractTx: INITIAL_STATE['ARR'],
    contractInternalTx: INITIAL_STATE['ARR'],
    contractTokenTx: INITIAL_STATE['ARR'],
    contractEvents: INITIAL_STATE['ARR'],
    contractAbi: INITIAL_STATE['OBJ'],
    contractReadInfo: {
      loading: false,
      funcList: [],
      funcOutputs: [],
      funcError: [],
      error: ''
    }
  }

  let newState;
  export const contractsReducer = (state = initialState, action) => {
      switch(action.type){
          case SELECT_CONTRACT_LIST: {
            newState = deepcopy(state)
            newState.contracts.data = action.payload
            return getState('ARR', REDUX_STEP.READY, newState, action, 'contracts')
          }
          case SELECT_CONTRACT_LIST_FULFILLED: {
            return getState('ARR', REDUX_STEP.FULFILLED, newState, action, 'contracts')  
          }
          case SELECT_CONTRACT_LIST_REJECTED: {
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contracts')
          }

          case CONTRACT_INFO: {
            newState = deepcopy(state)
            console.log(newState, "info")
            newState.contract.data = action.payload
            return newState;
            // return getState('OBJ', REDUX_STEP.READY, newState, action, 'contract')
          }
          default: 
            return state;
      }
  }