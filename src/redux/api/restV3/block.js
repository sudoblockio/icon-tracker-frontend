import { makeUrl } from '../../../utils/utils'
import { axiosApi } from './config'

export function blockListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/block/list', payload))
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockInfoApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/block/info', payload))
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockTxListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/block/txList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}