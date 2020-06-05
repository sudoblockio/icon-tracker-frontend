import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

export function blockList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/block/list', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockInfo(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/block/info', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockTxList(payload) {
  const trackerApi = trackerApiInstance()
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