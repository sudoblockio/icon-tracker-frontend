import axios from 'axios'

let axiosApi = axios.create({
  baseURL: 'http://13.125.99.181:8080',
  headers: {
    'Content-Type': 'application/json',
  }
})

export function getMainInfo() {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/main/mainInfo')
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
