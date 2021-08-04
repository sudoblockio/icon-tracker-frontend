const INIT_POPUP='popup/INIT_POPUP'
const SET_POPUP='popup/SET_POPUP'

export const initPopup = () => ({
    type: INIT_POPUP
});

export const setPopup = (payload) => ({
    type: SET_POPUP,
    payload
})


const initialState = {
    type: '',
    data: {}
}

const popupReducer = ( state = initialState, action) => {
    switch (action.type) {
        case INIT_POPUP: {
            return initialState
        }
        case SET_POPUP: {
            return action.payload
        }
        default:
            return state;
    }
}


export default popupReducer;