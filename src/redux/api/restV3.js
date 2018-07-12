import axios from 'axios'

const productionURL = 'https://tracker.icon.foundation'
const developmentURL = 'https://trackerdev.icon.foundation'
const localDevUrl = 'https://trackerlocaldev.icon.foundation'
const axiosApi = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? developmentURL : productionURL,
  baseURL: localDevUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export function addressInfoApi(payload) {
  const { address } = payload;
  return new Promise((resolve, reject) => {
    axiosApi.get(`/v3/address/info?address=${address}`)
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addressTxListApi(payload) {
  const { address, page, count } = payload;
  return new Promise((resolve, reject) => {
    axiosApi.get(`/v3/address/txList?address=${address}&page=${page || 1}&count=${count || 10}`)
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addressTokenTxListApi(payload) {
  const { address, page, count } = payload;
  return new Promise((resolve, reject) => {
    axiosApi.get(`/v3/address/tokenTxList?address=${address}&page=${page}&count=${count}`)
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}