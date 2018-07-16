import { makeUrl } from '../../../utils/utils'
import { axiosApi } from './config'

export function addressListApi(payload) {
    return new Promise((resolve, reject) => {
        axiosApi.get(makeUrl(`/v3/address/list`, payload))
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressInfoApi(payload) {
    return new Promise((resolve, reject) => {
        axiosApi.get(makeUrl(`/v3/address/info`, payload))
            .then(result => {
                console.log(result.data)
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressTxListApi(payload) {
    return new Promise((resolve, reject) => {
        axiosApi.get(makeUrl(`/v3/address/txList`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addressTokenTxListApi(payload) {
    return new Promise((resolve, reject) => {
        axiosApi.get(makeUrl(`/v3/address/tokenTxList`, payload))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}