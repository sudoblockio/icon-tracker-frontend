import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function blockList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/api/v1/blocks', payload))
      .then(result => {
        console.log(result, "block list result")
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function blockInfo(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`/api/v1/blocks/${payload.height}`)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function blockTxList(payload) {
  console.log(payload, "block tx payload")
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`/api/v1/transactions?block_number=${payload.height}`)
      .then(result => {
        console.log(result, "int tx result")
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}