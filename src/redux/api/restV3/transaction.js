import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function transactionRecentTx(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/api/v1/transactions', payload))
      .then(result => {
        resolve(result)
      })
      .catch(error => {

        reject(error)
      })
  })
}

export async function transactionTxDetail(payload) {
  
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`/api/v1/transactions/details/${payload.txHash}`)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function transactionEventLogList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`/api/v1/logs?transaction_hash=${payload.txHash}`)
      .then(result => {
        
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function transactionInternalTxList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`/api/v1/transactions/internal/${payload}`)
      .then(result => {
        console.log(result, "result")
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}