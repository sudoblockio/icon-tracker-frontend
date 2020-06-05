import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

export function tokenList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/list', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenTxList(payload) {
  const trackerApi = trackerApiInstance()
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
  const trackerApi = trackerApiInstance()
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
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/token/holders', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}