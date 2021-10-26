import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'
import { prefixes } from '../../../utils/const'

const  {ADDRESSES_PREFIX, TRANSACTIONS_PREFIX} = prefixes


export async function addressList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(`${ADDRESSES_PREFIX}`)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function addressInfo(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(`${ADDRESSES_PREFIX}/details/${payload.address}`)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                
                reject(error)
            })
    })
}

export async function addressTxList(payload) {
    const trackerApi = await trackerApiInstance()
    console.log(payload, "what is missing?")
    return new Promise((resolve, reject) => {
        trackerApi.get(`${TRANSACTIONS_PREFIX}/address/${payload.address}`)
            .then(result => {
                {console.log(result, "from the api call")}
                resolve(result)
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
        trackerApi.get(`${TRANSACTIONS_PREFIX}/internal/address/${payload.address}`)
            .then(result => {

                resolve(result)
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