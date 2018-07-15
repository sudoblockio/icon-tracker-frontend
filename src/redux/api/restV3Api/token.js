import { makeUrl } from '../../../utils/utils'
import { axiosApi } from './config'

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