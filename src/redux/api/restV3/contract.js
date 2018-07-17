import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function contractInfo(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/info', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/txList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractTokenTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/tokenTxList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}