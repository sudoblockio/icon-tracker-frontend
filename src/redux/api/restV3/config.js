import axios from 'axios'

export async function trackerApiInstance() {
  const apiUrl = await getApiUrl()
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export async function walletApiInstance() {
  const apiUrl = await getApiUrl()
  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export async function getApiUrl() {
  const configFile = await getConfigFile()
  const { REACT_APP_API_URL } = configFile

  if (!!REACT_APP_API_URL) {
    return REACT_APP_API_URL
  }

  if (!!process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL
  }

  if (!!process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'production':
        return 'http://tracker.icon.foundation'
      case 'development':
      default:
        return 'http://trackerlocaldev.icon.foundation'
    }
  }
}

async function getConfigFile() {
  try {
    const response = await fetch('/config.json')
    const responseJson = await response.json();
    return responseJson
  }
  catch(e) {
    return {}
  }
}