import axios from "axios";
import configJson from "../../../config.js";

import config from "../../../config.js";

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
  return config.apiEndpoint;
  // if (configJson && configJson.TRACKER_API_URL) {
  //   return configJson.TRACKER_API_URL;
  // }
}

export async function getSocketUrl() {
  return config.wssEndpoint;
}

export async function getWalletApiUrl() {
  return config.rpcEndpoint;

  // if (configJson && configJson.WALLET_API_URL) {
  //   return configJson.WALLET_API_URL;
  // }
}

export async function getIsSoloVersion() {
  if (configJson && configJson.IS_SOLO_VERSION) {
    return !!configJson.IS_SOLO_VERSION;
  }
}
