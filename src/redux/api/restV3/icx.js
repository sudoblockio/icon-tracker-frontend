import { randomUint32 } from 'utils/utils'
import { walletApiInstance } from './config'
import IconService, { HttpProvider } from "icon-sdk-js"
import { getWalletApiUrl } from "./config"

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
