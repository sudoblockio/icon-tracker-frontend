import { makeUrl } from '../../../utils/utils'
import { axiosApi } from './config'

export function selectContractListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/Contract/selectContractList', payload))
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
    axiosApi.get(makeUrl('/v3/Contract/selectContractInfo', payload))
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
    axiosApi.get(makeUrl('/v3/Contract/selectContractTransactionList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function selectContractTokenTransferListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/Contract/selectContractTokenTransferList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}