import { makeUrl } from 'utils/utils'
import { trackerApi } from './config'

export function contractList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/list', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

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

export function contractDetail(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/detail', payload))
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

export function contractEventLogList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/eventLogList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractInternalTxList(payload) {
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/internalTxList', payload))
      .then(result => {
        console.log(result)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

