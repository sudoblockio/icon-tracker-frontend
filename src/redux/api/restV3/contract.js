import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance, walletApiInstance } from './config'
import { randomUint32 } from '../../../utils/utils'

export async function contractList(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    trackerApi.get(makeUrl('/api/v1/contracts', payload))
      .then(result => {
        console.log(result.headers, "contract result")
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function contractInfo(payload) {
  const trackerApi = await trackerApiInstance()
  return new Promise((resolve, reject) => {
    console.log(payload, "contract info payload, ")
    trackerApi.get(makeUrl(`/api/v1/contracts/${payload.addr}`, payload))
      .then(result => {
        console.log(result)
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function contractDetail(payload) {
  console.log(payload, "contract detail payload")
  const trackerApi = await trackerApiInstance()
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

export async function contractTxList(payload) {
  const trackerApi = await trackerApiInstance()
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

export async function contractTokenTxList(payload) {
  const trackerApi = await trackerApiInstance()
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

export async function contractEventLogList(payload) {
  const trackerApi = await trackerApiInstance()
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

export async function contractInternalTxList(payload) {
  const trackerApi = await trackerApiInstance()
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

export async function getScoreStatus(address) {
  console.log(address, "address from getScoreStatus")
  const walletApi = await walletApiInstance()
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
        console.log(response.data, "yellow")
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