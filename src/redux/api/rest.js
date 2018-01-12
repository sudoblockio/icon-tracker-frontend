import axios from 'axios'

let asxiosApi = axios.create({
  baseURL: 'http://13.125.99.181:8080',
  headers: {
    'Content-Type': 'application/json',
  }
})

export function postMainInfo() {
  return new Promise((resolve, reject) => {
    asxiosApi.post('/v0/main/mainInfo')
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
