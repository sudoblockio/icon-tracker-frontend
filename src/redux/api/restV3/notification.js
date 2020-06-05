import { trackerApiInstance } from './config'
import { makeUrl } from 'utils/utils'

export function pushRegister(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.post('/v3/push/register', payload)
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function pushWithdraw(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.delete(makeUrl('/v3/push/withdraw', payload))
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}