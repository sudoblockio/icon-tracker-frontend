import { trackerApiInstance } from './config'

export async function pushRegister(payload) {
    const trackerApi = await trackerApiInstance()
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