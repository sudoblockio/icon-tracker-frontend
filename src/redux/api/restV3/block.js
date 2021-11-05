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
  console.log(payload, "what payload? ")
  const trackerApi = await trackerApiInstance()
  if (payload.height === '0' ) {
    const num = 800460000*Math.pow(10,18)
    const result = {
      data: {
        hash: "0xcf43b3fd45981431a0e64f79d07bfcf703e064b73b802c5f32834eec72142190",
        number: 0,
        transaction_amount: num.toString(16),
        transaction_fees: 0,
        message: "A rhizome has no beginning or end; it is always in the middle, between things, interbeing, intermezzo. The tree is filiation, but the rhizome is alliance, uniquely alliance. The tree imposes the verb 'to be' but the fabric of the rhizome is the conjunction, 'and ... and ...and...' This conjunction carries enough force to shake and uproot the verb 'to be.' Where are you going? Where are you coming from? What are you heading for? These are totally useless questions. - Mille Plateaux, Gilles Deleuze & Felix Guattari 'Hyperconnect the world'",
      },
      status: 200
    }
    return result
  }
  return new Promise((resolve, reject) => {
    trackerApi.get(`${BLOCKS_PREFIX}/${payload.height}`)
      .then(result => {
        console.log(result, "the block result")
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