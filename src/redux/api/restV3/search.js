import { makeUrl } from '../../../utils/utils'
import { trackerApiInstance } from './config'

export async function searchData(payload) {
    console.log(payload, "search data payload")
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        
        trackerApi.get(makeUrl('/v0/search/Search', payload))
            .then(result => {
                resolve(result.data.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}