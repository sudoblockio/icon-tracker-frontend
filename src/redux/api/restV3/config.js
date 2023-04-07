import axios from "axios";
import configJson from "../../../config.js";

import config from "../../../config/config.js";

export async function trackerApiInstance() {
  const apiUrl = await getTrackerApiUrl();
  return axios.create({
    baseURL: apiUrl,
  });
}

export async function walletApiInstance() {
  const apiUrl = await getWalletApiUrl();
  return axios.create({
    baseURL: apiUrl,
  });
}

export async function getTrackerApiUrl() {
  return config.origin;
  // if (configJson && configJson.TRACKER_API_URL) {
  //   return configJson.TRACKER_API_URL;
  // }
}

export async function getSocketUrl() {
  return config.socketUrl;
}

export async function getWalletApiUrl() {
  return config.apiBaseUrl;

  // if (configJson && configJson.WALLET_API_URL) {
  //   return configJson.WALLET_API_URL;
  // }
}

export async function getIsSoloVersion() {
  if (configJson && configJson.IS_SOLO_VERSION) {
    return !!configJson.IS_SOLO_VERSION;
  }
}
