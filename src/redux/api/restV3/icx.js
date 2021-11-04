import { randomUint32 } from '../../../utils/utils'
import { walletApiInstance } from './config'
import IconService, { HttpProvider } from "icon-sdk-js"
import { getWalletApiUrl } from "./config"
import axios from 'axios'

// export async function icxGetScore(params) {
//   const walletApi = await walletApiInstance()
//   return new Promise(resolve => {
//     const param = {
//       jsonrpc: "2.0",
//       method: "icx_getScoreApi",
//       params: params,
//       id: randomUint32()
//     }
 
//     walletApi.post(`/api/v3`, JSON.stringify(param))
//       .then(response => {
    
//         resolve(response);
//       })
//       .catch(error => {
//         if (!!error.response) {
//           resolve(error.response.data);
//         }
//         else {
//           resolve({
//             error: {
//               message: error.message
//             }
//           })
//         }
//       })
//   });
// }

export async function icxCall(params) {

  const walletApi = await walletApiInstance()
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      params: params,
      id: randomUint32()
    }

    walletApi.post(`/api/v3`, JSON.stringify(param))
      .then(response => {

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

export async function getTransaction(txHash) {
  const walletApiUrl = await getWalletApiUrl()
  const url = `${walletApiUrl}/api/v3`;
  const provider = new HttpProvider(url)
  const iconService = new IconService(provider);
  try {
    const response = await iconService.getTransaction(txHash).execute();
    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getTransactionResult(txHash) {
  const walletApiUrl = await getWalletApiUrl()
  const url = `${walletApiUrl}/api/v3`;
  const provider = new HttpProvider(url)
  const iconService = new IconService(provider);
  try {
    const response = await iconService.getTransactionResult(txHash).execute();
    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getTransactionResultNotSdk(txHash) {
  const walletApiUrl = await getWalletApiUrl()  
  try {
    const response = await axios({
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      method: 'post',
      url: `${walletApiUrl}/api/v3`,
      data: {
        id: new Date().getTime() * 1000,
        jsonrpc: "2.0",
        method: "icx_getTransactionResult",
        params: { txHash }
      }
    })      
    return response.data.result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}