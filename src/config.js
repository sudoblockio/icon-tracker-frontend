let configJson;

let wsURL = "wss://" + `${window.location.host}`
let apiUrl = `${window.location.origin}`

// For local development
if (apiUrl === 'http://localhost:3000') {
    apiUrl = 'https://tracker.icon.community/'
}
if (wsURL === 'wss://localhost:3000') {
    wsURL = 'wss://tracker.icon.community'
}

let walletUrls = {
    'https://tracker.icon.community': 'https://api.icon.community',
    'https://tracker.berlin.icon.community': 'https://api.berlin.icon.community',
    'https://tracker.lisbon.icon.community': 'https://api.lisbon.icon.community',
    'https://tracker.sejong.icon.community': 'https://api.sejong.icon.community',

    // Singapore regional prod
    'https://tracker.v2.mainnet.sng.vultr.icon.community': 'https://api.mainnet.sng.vultr.icon.community',
    'https://tracker.v2.berlin.sng.vultr.icon.community': 'https://api.berlin.sng.vultr.icon.community',
    'https://tracker.v2.lisbon.sng.vultr.icon.community': 'https://api.lisbon.sng.vultr.icon.community',
    'https://tracker.v2.sejong.sng.vultr.icon.community': 'https://api.sejong.sng.vultr.icon.community',
    // Amsterdam regional prod
    'https://tracker.v2.mainnet.ams.vultr.icon.community': 'https://api.mainnet.ams.vultr.icon.community',
    'https://tracker.v2.berlin.ams.vultr.icon.community': 'https://api.berlin.ams.vultr.icon.community',
    'https://tracker.v2.lisbon.ams.vultr.icon.community': 'https://api.lisbon.ams.vultr.icon.community',
    'https://tracker.v2.sejong.ams.vultr.icon.community': 'https://api.sejong.ams.vultr.icon.community',

    'https://tracker.berlin.geometry.io': 'https://berlin.net.solidwallet.io',  // RM
    'https://tracker.lisbon.geometry.io': 'https://lisbon.net.solidwallet.io',  // RM

    'localhost:3000': 'https://ctz.solidwallet.io',
}

export const nodeApiUrl = walletUrls[`${apiUrl}`] || 'https://api.icon.community'


switch (`${process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT}` + `-` + `${process.env.REACT_APP_NETWORK_NAME}`) {
    case 'dev-mainnet':
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
    case 'prod-mainnet' :
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
    case 'prod-sejong' :
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
    case 'prod-berlin' :
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
    case 'prod-lisbon' :
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
    default:
        configJson = {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "TRACKER_WS_URL": wsURL,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false
        }
        break
}

export default configJson;
