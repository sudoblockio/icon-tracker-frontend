import { makeUrl } from 'utils/utils'
import { trackerApiInstance, walletApiInstance } from './config'
import { randomUint32 } from '../../../utils/utils'

export function contractList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/list', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractInfo(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/info', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractDetail(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/detail', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractTxList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/txList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractTokenTxList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/tokenTxList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractEventLogList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/eventLogList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function contractInternalTxList(payload) {
  const trackerApi = trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/v3/contract/internalTxList', payload))
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getScoreStatus(address) {
  const walletApi = walletApiInstance()
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: randomUint32(),
      "method": "icx_call",
      "params": {
        "to": "cx0000000000000000000000000000000000000001",
        "dataType": "call",
        "data": {
          "method": "getScoreStatus",
          "params": {
            address
          }
        }
      }
    }
    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        }
        else {
          resolve({
            error: {
              message: error.message
            }
          })
        }
      })
  });
}