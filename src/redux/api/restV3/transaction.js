import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

export function transactionRecentTx(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/recentTx', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionTxDetail(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/txDetail', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionEventLogList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/eventLogList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionInternalTxList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/internalTxList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}