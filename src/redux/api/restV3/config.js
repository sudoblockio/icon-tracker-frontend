import axios from 'axios'

// const productionURL = 'https://tracker.icon.foundation'
// const developmentURL = 'https://trackerdev.icon.foundation'
export const localDevUrl = 'https://trackerlocaldev.icon.foundation'
export const axiosApi = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? developmentURL : productionURL,
  baseURL: localDevUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
