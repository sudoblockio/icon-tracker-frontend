import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const BLOCK_PREFIX = '/v1/blocks'
const SEARCH_BLOCKS = 'SEARCH_BLOCKS'


const getsearchBlocks = (payload) => ({
    type: SEARCH_BLOCKS,
    payload
})


export const searchBlocks = (payload) => async (dispatch) => {
    console.log(payload, "payload search input")
    const trackerApi = await trackerApiInstance();
    try {
        const response = await trackerApi.get(`/api${BLOCK_PREFIX}/${payload.number}`)
        console.log(response, "res from searchInput")
        if (response.status === 200) {
            const data = response.data.data;
            dispatch(getsearchBlocks(data))
            console.log(data, "data from searchInput")
            return data
    } else {
        // setError(error)
    }
}
    catch (e) {
        console.log(e, "error from searchInput")
    }
};



const initialState = {
    loading: false,
    error: ''
  };
  
let newState;
const searchReducer = (state = initialState, action) => {
    console.log(action, "this is action")
    switch (action && action.type) {
        case SEARCH_BLOCKS: {
            newState = deepcopy(state);
            console.log(newState, "this is the new state from search")
            newState.search = action.payload
            return Object.assign({}, state, {
                loading: true
              })
        }
        default: 
            return state;
    }
}

export default searchReducer