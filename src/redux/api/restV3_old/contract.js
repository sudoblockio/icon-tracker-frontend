import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function selectContractListApi(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/Contract/selectContractList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function selectContractInfoApi(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/Contract/selectContractInfo', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function selectContractTransactionListApi(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/Contract/selectContractTransactionList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractTokenTxListApi(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/Contract/contractTokenTxList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}