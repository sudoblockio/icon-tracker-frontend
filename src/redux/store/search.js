import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const SEARCH_BLOCKS = 'SEARCH_BLOCKS'

const getsearchBlocks = (payload) => ({
    type: SEARCH_BLOCKS,
    payload
})


export const searchBlocks = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance()
    try 
   { const response = trackerApi.get(makeUrl('/v0/search/Search', payload));
    if (response.ok) {
        const resultData = await response.data.data;
        dispatch(getsearchBlocks(resultData))
        return resultData
    }}
    catch (e) {
        console.log(e, "e from search")
    }
}

// the right way: 
// export const findAddress = (address) => async (dispatch) => {
//     const trackerApi = await trackerApiInstance()
//     const response = trackerApi.get(makeUrl(`/accounts/${address}`, address));

//     if (response.ok) {
//         const resultData = await response.data.data;
//         dispatch(searchData(resultData))
//     }
// }



const initialState = {
    loading: false,
    error: ''
  };
  
let newState;

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_BLOCKS: {
            newState = deepcopy(state);
            newState = action.data
            return newState;
        }
        default: 
        return state;
    }
}

export default searchReducer