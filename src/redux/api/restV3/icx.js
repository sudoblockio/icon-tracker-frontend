import { randomUint32 } from '../../../utils/utils'
import { walletApi } from './config'

export function icxGetScore(params) {
  return new Promise((resolve, reject) => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_getScoreApi",
      params: params,
      id: randomUint32()
    }
    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        console.log(response)
        resolve(response);
      })
      .catch(error => {
        console.log(error)
        reject(error);
      })
  });
}

// TODO 에러 처리
export function icxCall(params) {
  return new Promise((resolve, reject) => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      params: params,
      id: randomUint32()
    }
    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        // console.log(response)
        resolve(response);
      })
      .catch(error => {
        console.log(error)
        reject(error);
      })
  });
}