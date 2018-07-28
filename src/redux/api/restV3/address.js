import { makeUrl } from 'utils/utils'
import { trackerApi } from './config'

export function addressList(payload) {
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/list`, payload))
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressInfo(payload) {
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/address/info`, payload))
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressTxList(payload) {
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