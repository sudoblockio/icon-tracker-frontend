import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE, REDUX_STEP} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const CX_PREFIX = `/v1/contracts`;

const SELECT_CONTRACT_LIST = 'SELECT_CONTRACT_LIST';
const SELECT_CONTRACT_LIST_FULFILLED = 'SELECT_CONTRACT_LIST_FULFILLED';
const SELECT_CONTRACT_LIST_REJECTED = 'SELECT_CONTRACT_LIST_REJECTED';

const getContractList = (payload) => ({
    type: SELECT_CONTRACT_LIST,
    payload
});


export const contractList = (payload) => async (dispatch) => {
    console.log(payload, "contracts payload")
    const trackerApi = await trackerApiInstance();
    try {
        const res = await trackerApi.get(makeUrl(`${CX_PREFIX}`, payload))
        console.log(res, "res from contracts")
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
            return getState('ARR', REDUX_STEP.FULFILLED, state, action, 'contracts')  
          }
          case SELECT_CONTRACT_LIST_REJECTED: {
            return getState('ARR', REDUX_STEP.REJECTED, state, action, 'contracts')
          }
          default: 
            return state;
      }
  }