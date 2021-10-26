import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'
import { prefixes } from '../../../utils/const'

const { BLOCKS_PREFIX, TRANSACTIONS_PREFIX } = prefixes
export async function blockList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl(`${BLOCKS_PREFIX}`, payload))
      .then(result => {

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
    trackerApi.get(`${BLOCKS_PREFIX}/${payload.height}`)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function blockTxList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(`${TRANSACTIONS_PREFIX}?block_number=${payload.height}`)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}