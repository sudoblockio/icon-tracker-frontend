import axios from 'axios'

// const productionURL = 'https://tracker.icon.foundation'
// const developmentURL = 'https://trackerdev.icon.foundation'
const localDevUrl = 'https://trackerlocaldev.icon.foundation'
const axiosApi = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? developmentURL : productionURL,
  baseURL: localDevUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

function makeUrl(url, payload) {
  if (!payload) {
    return url
  }

  let result = url
  Object.keys(payload).forEach((key, index) => {
    result += `${index === 0 ? '?' : '&'}${key}=${payload[key]}`
  })
  return result
}

export function addressInfoApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl(`/v3/address/info`, payload))
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
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl(`/v3/address/txList`, payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addressTokenTxListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl(`/v3/address/tokenTxList`, payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockInfoApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/block/info', payload))
      .then(result => {
        console.log(result.data)
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function blockTxListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/block/txList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}


export function transactionRecentTxApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/transaction/recentTx', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function transactionTxDetailApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/transaction/txDetail', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function tokenGetTokenListApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get(makeUrl('/v3/token/getTokenList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}