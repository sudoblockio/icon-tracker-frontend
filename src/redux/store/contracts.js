import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { INITIAL_STATE} from '../../../src/utils/const'
import { trackerApiInstance } from '../api/restV3/config'

const CX_PREFIX = `/api/v1/etc`

const CONTRACTS_LIST = 'CONTRACT_LIST'

const getContractsList = (payload) => ({
    type: CONTRACTS_LIST,
    payload
});


export const contractList = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
        const res = await trackerApi.get(makeUrl(`${CX_PREFIX}`, payload))
        if (res.status === 200) {
            const data = res.data
            dispatch(getContractsList(data))
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

  export const contractsReducer = (state = initialState, action) => {
      switch(action.type){
          case CONTRACTS_LIST: {
            return getState('ARR', REDUX_STEP.READY, state, action, 'contracts')
          }
          default: 
            return state;
      }
  }