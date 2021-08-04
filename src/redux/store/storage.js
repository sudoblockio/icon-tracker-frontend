import { makeUrl } from '../../utils/utils';
import * as deepcopy from 'deepcopy'
import { trackerApiInstance } from '../api/restV3/config'

const SET_BANNER_OPTION='storage/SET_BANNER_OPTION'
const SET_ADDRESS='storage/SET_ADDRESS'
const SET_ADDRESS_SUCCESS='storage/SET_ADDRESS_SUCCESS'
const SET_NOTIFICTAION='storage/SET_NOTIFICATION'
const SET_NOTIFICTAION_SUCCESS='storage/SET_NOTIFICATION_SUCCESS'
const CLEAR_WALLET='storage/CLEAR_WALLET'
const CLEAR_WALLET_SUCCESS='storage/CLEAR_WALLET_SUCCESS'

export const setBannerOption = (payload) => ({
    type: SET_BANNER_OPTION,
    payload
})

export const setAddress = (payload) => ({
    type: SET_ADDRESS,
    payload
})

export const setNotification = (payload) => ({
    type: SET_NOTIFICTAION,
    payload
})

export const clearWallet = () => ({
    type: CLEAR_WALLET
})

const initialState = {
    bannerExpireDate: undefined,
    walletAddress: '',
    walletNotification: false,
    walletLanding: false,
  }

const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BANNER_OPTION:
            return Object.assign({}, state, {
                bannerExpireDate: action.payload.bannerExpireDate
            })
        case SET_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                walletAddress: action.payload
            })
        case SET_NOTIFICTAION_SUCCESS: 
            return Object.assign({}, state, {
                walletNotification: action.payload
            })
        case CLEAR_WALLET_SUCCESS:
            return Object.assign({}, state, {
                walletAddress: '',
                walletNotification: false,
                walletLanding: false,
            })
        default: {
            return state
        }
    }
}

export default storageReducer;