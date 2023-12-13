import axios from 'axios'
import configJson from '../../../config.js'

import config from '../../../config.js'
import defaults from '../../../configData'

export async function trackerApiInstance(label = 'default') {
    const apiUrl = await getTrackerApiUrl(label)
    return axios.create({
        baseURL: apiUrl,
    })
}

export async function walletApiInstance(label = 'default', customUrl = '') {
    let apiUrl = customUrl
    if (label !== 'custom') {
        apiUrl = await getWalletApiUrl(label)
    }

    return axios.create({
        baseURL: apiUrl,
    })
}

export async function getTrackerApiUrl(label = 'default') {
    switch (label) {
        case 'mainnet':
            return config.setting.mainnet.apiEndpoint
        case 'berlin':
            return config.setting.berlin.apiEndpoint
        case 'lisbon':
            return config.setting.lisbon.apiEndpoint
        case 'default':
        default:
            return config.apiEndpoint
    }
    // if (configJson && configJson.TRACKER_API_URL) {
    //   return configJson.TRACKER_API_URL;
    // }
}

export async function getSocketUrl(label = 'default') {
    switch (label) {
        case 'mainnet':
            return config.setting.mainnet.wssEndpoint
        case 'berlin':
            return config.setting.berlin.wssEndpoint
        case 'lisbon':
            return config.setting.lisbon.wssEndpoint
        case 'default':
        default:
            return config.wssEndpoint
    }
}

export async function getWalletApiUrl(label = 'default') {
    switch (label) {
        case 'mainnet':
            return config.setting.mainnet.rpcEndpoint
        case 'berlin':
            return config.setting.berlin.rpcEndpoint
        case 'lisbon':
            return config.setting.lisbon.rpcEndpoint
        case 'default':
        default:
            return config.rpcEndpoint
    }

    // if (configJson && configJson.WALLET_API_URL) {
    //   return configJson.WALLET_API_URL;
    // }
}

export async function getNid(label = 'default') {
    switch (label) {
        case 'mainnet':
            return config.setting.mainnet.nid
        case 'berlin':
            return config.setting.berlin.nid
        case 'lisbon':
            return config.setting.lisbon.nid
        case 'default':
        default:
            return config.nid
    }
}

export async function getIsSoloVersion() {
    if (configJson && configJson.IS_SOLO_VERSION) {
        return !!configJson.IS_SOLO_VERSION
    }
}
