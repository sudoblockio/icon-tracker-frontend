import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://13.125.99.181:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function postMainInfo() {
  return new Promise((resolve, reject) => {
    axiosApi.post('/v0/main/mainInfo')
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getBlocksApi(payload) {
  const data = {
    "page": payload || 0
  }
  return new Promise((resolve, reject) => {
    axiosApi.post('/v0/block/recentBlock', JSON.stringify(data))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}
