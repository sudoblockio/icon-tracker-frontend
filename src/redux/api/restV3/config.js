import axios from 'axios'

export async function trackerApiInstance() {
  const apiUrl = await getTrackerApiUrl()
  return axios.create({
    baseURL: apiUrl,
  })
}

export async function walletApiInstance() {
  const apiUrl = await getWalletApiUrl()
  return axios.create({
    baseURL: apiUrl
  })
}

export async function getTrackerApiUrl() {
  if (process.env.TRACKER_API_URL) {
    return process.env.TRACKER_API_URL
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
        return 'https://tracker.icon.foundation'
      case 'testnet':
        return 'https://trackerdev.icon.foundation'
      case 'testnet1':
        return 'https://bicon.tracker.solidwallet.io'
      case 'custom':
        return 'http://trackerlocaldev.icon.foundation'
      default:
    }
  }

  const configFile = await getConfigFile()
  if (configFile && configFile.TRACKER_API_URL) {
    return configFile.TRACKER_API_URL
  }

  return '/'
}

export async function getWalletApiUrl() {
  if (process.env.WALLET_API_URL) {
    return process.env.WALLET_API_URL
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
        return 'https://ctz.solidwallet.io'
      case 'testnet':
        return 'https://test-ctz.solidwallet.io'
      case 'testnet1':
        return 'https://bicon.net.solidwallet.io'
      case 'custom':
        return 'http://13.209.103.183:9000'
      default:
    }
  }

  const configFile = await getConfigFile()
  if (configFile && configFile.WALLET_API_URL) {
    return configFile.WALLET_API_URL
  }

  return '/'
}

export async function getIsSoloVersion() {
  if (process.env.IS_SOLO_VERSION) {
    return process.env.IS_SOLO_VERSION
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
      case 'testnet':
      case 'testnet1':
      case 'custom':
        return false
      default:
    }
  }

  const configFile = await getConfigFile()
  if (configFile && configFile.IS_SOLO_VERSION) {
    return !!configFile.IS_SOLO_VERSION
  }
  else {
    return false
  }
}

async function getConfigFile() {
  try {
    const response = await fetch('/config.json')
    const responseJson = await response.json();
    return responseJson
  }
  catch (e) {
    return {}
  }
}