import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function tokenList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/list', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/txList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenSummary(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/summary', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenTransfersList(payload) {
  return tokenTxList(payload)
}

export function tokenHoldersList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/holders', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}