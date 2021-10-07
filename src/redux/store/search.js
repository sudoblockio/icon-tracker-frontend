import { makeUrl, getState } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const BLOCK_PREFIX = '/v1/blocks'

const SEARCH_BLOCKS = 'SEARCH_BLOCKS'


// const getSearchBlocks = (payload) => ({
//     type: SEARCH_BLOCKS,
//     payload
// })

// function getSearchBlocks(payload) {
//     return function (dispatch) {
//         dispatch({
//             type: SEARCH_BLOCKS,
//             payload
//         });

//     }
// }

export function getSearchBlocks(payload) {
    return {
        type: SEARCH_BLOCKS, 
        payload
    }
}



export const searchBlocks = (payload) => async (dispatch) => {
    const trackerApi = await trackerApiInstance();
    try {
        const response = await trackerApi.get(`/api${BLOCK_PREFIX}/${payload}`)
        if (response.status === 200) {
            const data = response.data;
            dispatch(getSearchBlocks(data))
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
    error: '',
    redirect: false
  };
  
let newState;
const searchReducer = (state = initialState, action) => {
    switch (action && action.type) {
        case SEARCH_BLOCKS: {
            newState = deepcopy(state);
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