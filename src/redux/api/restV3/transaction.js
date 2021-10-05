import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function transactionRecentTx(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/recentTx', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function transactionTxDetail(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/txDetail', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function transactionEventLogList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/transaction/eventLogList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// export async function transactionInternalTxList(payload) {
//   const trackerApi = await trackerApiInstance()
//   return new Promise((resolve, reject) => {
//     trackerApi.get(makeUrl('/v3/transaction/internalTxList', payload))
//       .then(result => {
//         resolve(result.data)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }