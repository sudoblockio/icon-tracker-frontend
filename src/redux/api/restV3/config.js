import axios from "axios"

export function trackerApiInstance() {
  const apiUrl = getTrackerApiUrl()
  return axios.create({
    baseURL: apiUrl
  })
}

export function walletApiInstance() {
  const apiUrl = getWalletApiUrl()
  return axios.create({
    baseURL: apiUrl
  })
}

export function getTrackerApiUrl() {
	switch (process.env.REACT_APP_ENV) {
		case "mainnet":
			return "https://tracker.icon.foundation"
		case "testnet":
			return "https://trackerdev.icon.foundation"
		case "testnet1":
			// return "https://bicon.tracker.solidwallet.io"
			return "https://tracker.icon.foundation"
    case 'testnet2':
			return "http://10.201.11.74:8080"
		case "custom":
			return "http://trackerlocaldev.icon.foundation"
		case "prep":
		case "np":
			return "http://54.180.16.76"
		case "qa":
			return "http://13.125.236.68"
		default:
			return 	"https://tracker.icon.foundation"

	}
}

export function getWalletApiUrl() {
	switch (process.env.REACT_APP_ENV) {
		case "mainnet":
			return "https://wallet.icon.foundation"
		case "testnet":
			return "https://testwallet.icon.foundation"
		case "testnet1":
    	case 'testnet2':
		// return "https://bicon.net.solidwallet.io"
			return "http://13.125.65.157:9000"
		case "custom":
			return "http://13.209.103.183:9000"
		case "prep":
		case "np":
			return "http://20.20.7.156:9000"
		case "qa":
			return "https://devorg.icon.foundation"
		default:
			return "https://wallet.icon.foundation"
	}
}

export function getIsSoloVersion() {
  if (process.env.REACT_APP_ENV) {
    switch (process.env.REACT_APP_ENV) {
      case "mainnet":
      case "testnet":
      case "testnet1":
			case "testnet2":
      case "custom":
      case "prep":
      case "np":
      case "qa":
        return false
      default:
    }
  }

  return false
}

