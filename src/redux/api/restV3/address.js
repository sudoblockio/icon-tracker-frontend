import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function addressList(payload) {
    const trackerApi = await trackerApiInstance()
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

export async function addressInfo(payload) {
    const trackerApi = await trackerApiInstance()
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

export async function addressTxList(payload) {
    const trackerApi = await trackerApiInstance()
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

export async function addressTokenTxList(payload) {
    const trackerApi = await trackerApiInstance()
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

export async function addressInternalTxList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl('/v3/address/internalTxList', payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function addressVotedList(payload) {
    const trackerApi = await trackerApiInstance()

    if (payload.address) {
        payload.prep = payload.address
        delete payload.address
    }

    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/delegate/list`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}