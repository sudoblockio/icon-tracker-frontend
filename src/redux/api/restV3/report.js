import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

  export async function reportScam(payload){
    const {reported, reporter, imgFile, refUrl} = payload;
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
      trackerApi.post(makeUrl(`/v3/report/address?reported=${reported}&reporter=${reporter}&refUrl=${refUrl}`,imgFile))
        .then(result => {
          console.log(result)
          resolve(result.data)
        })
        .catch(error => {
          reject(error)
        })
    })  
  }