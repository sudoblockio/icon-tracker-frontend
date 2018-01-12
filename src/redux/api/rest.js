import axios from 'axios'

const asxiosApi = axios.create({
  baseURL: 'http://13.125.99.181:8080',
  // withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*'
  // }
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
