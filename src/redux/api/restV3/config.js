import axios from 'axios'

export async function trackerApiInstance() {
  const apiUrl = await getTrackerApiUrl()
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export async function walletApiInstance() {
  const apiUrl = await getWalletApiUrl()
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export async function getTrackerApiUrl() {
  if (process.env.TRACKER_API_URL) {
    return process.env.TRACKER_API_URL
  }

  const configFile = await getConfigFile()
  if (configFile && configFile.TRACKER_API_URL) {
    return configFile.TRACKER_API_URL
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'production':
        return 'https://tracker.icon.foundation'
      case 'development':
      default:
        return 'http://trackerlocaldev.icon.foundation'
    }
  }

  return 'http://trackerlocaldev.icon.foundation'
}

export async function getWalletApiUrl() {
  if (process.env.WALLET_API_URL) {
    return process.env.WALLET_API_URL
  }

  const configFile = await getConfigFile()
  if (configFile && configFile.WALLET_API_URL) {
    return configFile.WALLET_API_URL
  }

  return 'http://trackerlocaldev.icon.foundation'
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