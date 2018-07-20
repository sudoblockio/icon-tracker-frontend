import axios from 'axios'

// const productionURL = 'https://tracker.icon.foundation'
// const developmentURL = 'https://trackerdev.icon.foundation'
export const localDevUrl = 'http://trackerlocaldev.icon.foundation'
export const loopChainDevUrl = 'https://testwallet.icon.foundation'

export const trackerApi = axios.create({
  baseURL: localDevUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const walletApi  = axios.create({
  baseURL: localDevUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})