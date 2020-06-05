import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

export function addressList(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/list`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressInfo(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/info`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressTxList(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/txList`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressTokenTxList(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/tokenTxList`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressInternalTxList(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl('/v3/address/internalTxList', payload))
            .then(result => {
                console.log(result)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressVotedList(payload) {
    const trackerApi = trackerApiInstance()

    if (payload.address) {
        payload.prep = payload.address
        delete payload.address
    }

    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/delegate/list`, payload))
            .then(result => {
                console.log(result)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}