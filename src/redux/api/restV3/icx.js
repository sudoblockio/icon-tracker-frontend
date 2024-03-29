import { randomUint32 } from '../../../utils/utils'
import { walletApiInstance } from './config'
import IconService, { HttpProvider } from 'icon-sdk-js'
import { getWalletApiUrl } from './config'
import axios from 'axios'

function makeJsonRpc(method, params) {
  return {
    jsonrpc: '2.0',
    method: method,
    params: params,
    id: randomUint32(),
  }
}
async function makeRequest(params, method, label = 'default', customUrl = '') {
  const walletApi = await walletApiInstance(label, customUrl)
  return new Promise((resolve) => {
    const param = makeJsonRpc(method, params)

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then((response) => {
        console.log(`response for ${method}`, response)
        console.log(typeof response)
        resolve(response)
      })
      .catch((error) => {
        if (error.response) {
          resolve(error.response.data)
        } else {
          resolve({
            error: {
              message: error.message,
            },
          })
        }
      })
  })
}
export async function icxGetScoreFromRPC(params, label = 'default', customUrl = '') {
  return await makeRequest(params, 'icx_getScoreApi', label, customUrl)
}

export async function icxCall(params, label = 'default', customUrl = '') {
  return await makeRequest(params, 'icx_call', label, customUrl)
}

export async function icxSendTransactionRaw(params, label = 'default', customUrl = '') {
  return await makeRequest(params, 'icx_sendTransaction', label, customUrl)
}

export async function icxGetStepLimitEstimate(params) {
  const updatedParams = { ...params }
  delete updatedParams.signature
  delete updatedParams.stepLimit
  const response = await makeRequest(updatedParams, 'debug_estimateStep')
  return response.data.result
}

export async function getTransactionResultFromRPCNotSdk(txHash, label = 'default', customUrl = '') {
  const params = {
    txHash: txHash,
  }
  return await makeRequest(params, 'icx_sendTransaction', label, customUrl)
}

export async function getTransaction(txHash, label = 'default') {
  const walletApiUrl = await getWalletApiUrl(label)
  const url = `${walletApiUrl}/api/v3`
  const provider = new HttpProvider(url)
  const iconService = new IconService(provider)
  try {
    const response = await iconService.getTransaction(txHash).execute()
    return response
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export async function getTransactionResult(txHash, label = 'default') {
  const walletApiUrl = await getWalletApiUrl(label)
  const url = `${walletApiUrl}/api/v3`
  const provider = new HttpProvider(url)
  const iconService = new IconService(provider)
  try {
    const response = await iconService.getTransactionResult(txHash).execute()
    return response
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export async function getTransactionResultNotSdk(txHash, label = 'default') {
  const walletApiUrl = await getWalletApiUrl(label)
  try {
    const response = await axios({
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      method: 'post',
      url: `${walletApiUrl}/api/v3`,
      data: {
        id: new Date().getTime() * 1000,
        jsonrpc: '2.0',
        method: 'icx_getTransactionResult',
        params: { txHash },
      },
    })
    return response.data.result
  } catch (e) {
    console.error(e)
    return undefined
  }
}

async function sleep(time = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function getTxResultWaited(txHash, label = 'default', waitSeconds = 5) {
  const result = {
    error: '',
    result: '',
  }
  for (let i = 0; i < waitSeconds; i++) {
    const response = await getTransactionResultFromRPCNotSdk(txHash, label)
    if (!!response && response.error == null) {
      result.result = response
      result.error = ''
      return result
    } else {
      result.error = response.error
    }
    await sleep(1000)
  }

  return result
}
