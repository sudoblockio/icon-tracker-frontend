import axios from 'axios'

export const apiUrl = getUrl()
export const trackerApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})
export const walletApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getUrl() {
  if (!!process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL
  }  
  if (!!process.env.REACT_APP_ENV) {
    switch(process.env.REACT_APP_ENV) {
      case 'production':
        return 'http://tracker.icon.foundation'
      case 'development':
      default:
        return 'http://trackerlocaldev.icon.foundation'
    }
  } 
}