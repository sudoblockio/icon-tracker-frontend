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
              let item = ''
              
              if (startsWith(reported, '0x')) {
                item = 'transaction'
              }
              else if (startsWith(reported, 'cx')) {
                item = 'contract'
              }
              else  if (startsWith(reported, 'hx')) {
                item = 'address'
              }

              if (item) {
                alert(`You have already reported this ${item} as a scam ${item}. You can only report the same ${item} once.`)
              }
            }, 500)          
          }
        })
        .catch(error => {
          reject(error)
        })
    })  
  }