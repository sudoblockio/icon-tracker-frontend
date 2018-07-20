import actionTypes from '../actionTypes/actionTypes'

const initialState = {
    type: '',
    data: {}
}

export function popupReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.initPopup: 
            return initialState

        case actionTypes.setPopup: 
            return action.payload

        default: 
            return state
    }
}
