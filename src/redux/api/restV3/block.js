import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function blockList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/block/list', payload))
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockInfo(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/block/info', payload))
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/block/txList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}