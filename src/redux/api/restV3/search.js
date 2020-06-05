import { makeUrl } from 'utils/utils'
import { trackerApiInstance } from './config'

export function searchData(payload) {
    const trackerApi = trackerApiInstance()
    return new Promise((resolve, reject) => {
        console.log(payload, makeUrl('/v0/search/Search', payload))
        trackerApi.get(makeUrl('/v0/search/Search', payload))
            .then(result => {
                resolve(result.data.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}