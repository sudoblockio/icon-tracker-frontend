import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const SEARCH_DATA='search/SEARCH_DATA'
const searchData = (payload) => ({
    type: SEARCH_DATA,
    payload
})

export const findData = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    const response = trackerApi.get(makeUrl('/v0/search/Search', payload));
    if (response.ok) {
        const resultData = await response.data.data;
        dispatch(searchData(resultData))
    }
}

const initialState = {
    loading: false,
    error: ''
  };
  
let newState;

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_DATA: {
            newState = deepcopy(state);
            return newState;
        }
        default: 
        return state;
    }
}

export default searchReducer