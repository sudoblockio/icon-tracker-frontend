import { randomUint32 } from '../../../utils/utils'
import { trackerApi } from './config'

export function icxGetScore(payload) {
  const { address } = payload
  return new Promise((resolve, reject) => {
    let param = {
      jsonrpc: "2.0",
      method: "icx_getScoreApi",
      params: {
        address
      },
      id: randomUint32()
    }
    
    trackerApi.post(`/api/v3`, JSON.stringify(param))
      .then(res => {
        console.log(res)
        resolve(res.data.result);
      })
      .catch(error => {
        console.log(error)
        // reject(error.response.data.error.code);
        reject(error);
      })
  });
}