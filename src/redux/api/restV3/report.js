import { makeUrl, startsWith } from 'utils/utils'
import { trackerApiInstance } from './config'

  export async function reportScam(payload){
    const {reported, reporter, imgFile, refUrl} = payload;
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
      trackerApi.post(makeUrl(`/v3/report/address?reported=${reported}&reporter=${reporter}&refUrl=${refUrl}`,imgFile))
        .then(result => {
          resolve(result.data)
          if (result.data.result === "208") {
            setTimeout(() => {
              if (startsWith(reported, 'hx')) {
                alert('You have already reported this address as a scam address. You can only report the same address once.')
              }
              else {
                alert('You have already reported this transaction as a scam transaction. You can only report the same transaction once.')
              }
            }, 500)          
          }
        })
        .catch(error => {
          reject(error)
        })
    })  
  }