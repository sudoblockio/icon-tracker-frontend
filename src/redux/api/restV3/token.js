import { makeUrl } from '../../../utils/utils'
import { axiosApi } from './config'

export function tokenGetTokenListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenGetTokenTransferListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenTransferList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenGetTokenSummaryApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenSummary', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  }) 
}

export function tokenGetTokenTransfersApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenTransfers', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  }) 
}

export function tokenGetTokenHoldersApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenHolders', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  }) 
}