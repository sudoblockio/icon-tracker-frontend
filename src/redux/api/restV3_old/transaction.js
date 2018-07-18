import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function transactionRecentTxApi(payload) {
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