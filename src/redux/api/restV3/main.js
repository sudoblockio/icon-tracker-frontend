import { trackerApiInstance } from './config'

export async function getMainInfo() {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get('/v3/main/mainInfo')
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function getMainChart() {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get('/v3/main/mainChart')
      .then(result => {
        resolve(result.data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function getSupplyMetrics() {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get('/api/v1/metrics/supply')
      .then(result => {
        console.log(result, "supply metrics result")
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}