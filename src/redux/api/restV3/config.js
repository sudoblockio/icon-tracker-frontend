import axios from 'axios';

export async function trackerApiInstance() {
  const apiUrl = await getTrackerApiUrl();
  return axios.create({
    baseURL: apiUrl
  });
}

export async function walletApiInstance() {
  const apiUrl = await getWalletApiUrl();
  return axios.create({
    baseURL: apiUrl
  });
}

export async function getTrackerApiUrl() {
  const configFile = await getConfigJsonFile();
  if (configFile && configFile.TRACKER_API_URL) {
    return configFile.TRACKER_API_URL;
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
        return 'https://tracker.icon.foundation';
      // return 'https://bicon.tracker.solidwallet.io';
      case 'testnet':
        return 'https://trackerdev.icon.foundation';
      // return 'http://10.201.11.74:8081';
      case 'testnet1':
        return 'https://bicon.tracker.solidwallet.io';
      // return 'http://10.201.11.74:8081';
      case 'custom':
        return 'http://trackerlocaldev.icon.foundation';
      case 'prep':
      case 'np':
        return 'http://54.180.16.76';
      case 'qa':
        return 'http://13.125.236.68';
      default:
    }
  }

  return '/';
}

export async function getWalletApiUrl() {
  const configFile = await getConfigJsonFile();
  if (configFile && configFile.WALLET_API_URL) {
    return configFile.WALLET_API_URL;
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
        return 'https://wallet.icon.foundation';
      // return 'https://bicon.net.solidwallet.io';
      case 'testnet':
        return 'https://testwallet.icon.foundation';
      // return 'http://13.125.65.157:9000';
      case 'testnet1':
        return 'https://bicon.net.solidwallet.io';
      // return 'http://13.125.65.157:9000';
      case 'custom':
        return 'http://13.209.103.183:9000';
      case 'prep':
      case 'np':
        return 'http://20.20.7.156:9000';
      case 'qa':
        return 'https://devorg.icon.foundation';
      default:
    }
  }

  return '/';
}

export async function getIsSoloVersion() {
  const configFile = await getConfigJsonFile();
  if (configFile && configFile.IS_SOLO_VERSION) {
    return !!configFile.IS_SOLO_VERSION;
  }

  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case 'mainnet':
      case 'testnet':
      case 'testnet1':
      case 'custom':
      case 'prep':
      case 'np':
      case 'qa':
        return false;
      default:
    }
  }

  return false;
}

async function getConfigJsonFile() {
  try {
    const response = await fetch('/config.json');
    const responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.error(e);
    return {};
  }
}
