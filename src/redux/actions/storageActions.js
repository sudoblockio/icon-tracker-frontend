import actionTypes from '../actionTypes/actionTypes'

export function setBannerOption(payload) {
    return {
        type: actionTypes.setBannerOption,
        payload,
    }
}

export function setAddress(payload) {
    return {
        type: actionTypes.setAddress,
        payload,
    }
}

export function setNotification(payload) {
    return {
        type: actionTypes.setNotification,
        payload,
    }
}

export function clearWallet() {
    return {
        type: actionTypes.clearWallet,
    }
}

export function setWalletType(payload) {
    return {
        type: actionTypes.setWalletType,
        payload,
    }
}
export function setBip44Path(payload) {
    return {
        type: actionTypes.setBip44Path,
        payload,
    }
}
