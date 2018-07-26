import { makeUrl } from '../../../utils/utils'
import { trackerApi } from './config'

export function searchData(payload) {
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