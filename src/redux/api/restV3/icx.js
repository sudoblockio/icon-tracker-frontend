import { randomUint32 } from 'utils/utils'
import { walletApiInstance } from './config'

export async function icxGetScore(params) {
  const walletApi = await walletApiInstance()
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_getScoreApi",
      params: params,
      id: randomUint32()
    }
    console.log(JSON.stringify(param))
    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        console.log(response)
        resolve(response);
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

export async function icxCall(params) {
  const walletApi = await walletApiInstance()
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      params: params,
      id: randomUint32()
    }
    console.log(JSON.stringify(param))
    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        console.log(response)
        resolve(response);
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