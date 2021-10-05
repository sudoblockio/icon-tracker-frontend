import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const SEARCH_BLOCKS = 'SEARCH_BLOCKS'


const getsearchBlocks = (payload) => ({
    type: SEARCH_BLOCKS,
    payload
})


export const searchBlocks = (payload) => async (dispatch) => {
    console.log(payload, "search payload here ")
    const trackerApi = await trackerApiInstance()
    try { 
        console.log("from the try block")
        const response = trackerApi.get(makeUrl('/v1/blocks/', payload));
        console.log(response, "searchBlocks respose")
        if (response.data) {
            const resultData = response.data;
            dispatch(getsearchBlocks(resultData))
            return resultData
    }}
    catch (e) {
        console.log(e, "e from search")
    }
}



const initialState = {
    loading: false,
    error: ''
  };
  
let newState;
const searchReducer = (state = initialState, action) => {
    console.log(action, "this is action")
    switch (action.type) {
        case SEARCH_BLOCKS: {
            newState = deepcopy(state);
            console.log(newState, "this is the new state from search")
            newState.search = action.payload
            return newState;
        }
        default: 
            return state;
    }
}

export default searchReducer