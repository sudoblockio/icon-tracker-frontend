import { makeUrl, makeTokenUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function tokenList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeTokenUrl('/api/v1/addresses/contracts', payload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// NOTE: DO NOT USE THIS FUNCTIION, is the same thing as tokenTransferList but without the 'else' statement
// it should fetch the list of transactions for this token contract
// in reality it fetches a list of token transfers for this contract
// to obtain a list of transactions for a token contract is better
// to use the 'contractTxList' function that can be found at
// src/redux/store/contracts.js
export async function tokenTxList(payload) {
    console.log('token tx list')
    console.log(payload)
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(makeUrl('/api/v1/transactions/token-transfers', payload))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function tokenSummary(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(`/api/v1/contracts/${payload.contractAddr}`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function tokenTransfersList(payload) {
    console.log(payload, 'token transfer list payload')
    const trackerApi = await trackerApiInstance()
    if (!payload.contractAddr) {
        console.log(payload, 'payload token')
        return new Promise((resolve, reject) => {
            trackerApi
                .get(makeUrl('/api/v1/transactions/token-transfers', payload))
                .then((result) => {
                    console.log(result, 'token tx result')
                    resolve(result.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            trackerApi
                .get(
                    makeUrl(
                        `/api/v1/transactions/token-transfers/token-contract/${payload.contractAddr}`,
                        payload
                    )
                )
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export async function tokenHoldersList(payload) {
    console.trace(payload, 'contract holder payload')
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi
            .get(
                makeUrl(
                    `/api/v1/transactions/token-holders/token-contract/${payload.contractAddr}`,
                    payload
                )
            )
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
