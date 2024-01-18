import actionTypes from '../actionTypes/actionTypes'

export function initPopup() {
    return {
        type: actionTypes.initPopup,
    }
}

export function setPopup(payload) {
    return {
        type: actionTypes.setPopup,
        payload,
    }
}

const initialState = {
    type: '',
    data: {},
}

export function popupReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.initPopup:
            return initialState

        case actionTypes.setPopup:
            console.log(action, 'action from popup reducer')
            return action.payload

        default:
            return state
    }
}
