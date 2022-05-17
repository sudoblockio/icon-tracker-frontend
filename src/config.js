let configJson;

// Dev Settings - DO NOT COMMIT!
// let apiUrl = `https://tracker.berlin.icon.community`
// export const nodeApiUrl = 'https://berlin.net.solidwallet.io'
// let apiUrl = `https://tracker.icon.community`
// export const nodeApiUrl = 'https://api.icon.geometry.io'
// let apiUrl = 'http://localhost:8000'
// let wsURL = 'ws://localhost:8000'

// let apiUrl = 'https://tracker.v2.sejong.lax.vultr.sudoblock.dev'
// let wsURL = "wss://tracker.v2.sejong.lax.vultr.sudoblock.dev"

// let apiUrl = 'https://tracker.v2.sejong.sng.vultr.sudoblock.dev'
// let wsURL = 'wss://tracker-v2-bu.sudoblock.dev/'

let wsURL = "wss://" + `${window.location.host}`
let apiUrl = `${window.location.origin}`


let walletUrls = {
    'https://tracker.icon.community': 'https://api.icon.geometry.io',  // Change
    'https://tracker.berlin.icon.community': 'https://berlin.net.solidwallet.io',
    'https://tracker.lisbon.icon.community': 'https://lisbon.net.solidwallet.io',
    'https://tracker.sejong.icon.community': 'https://sejong.net.solidwallet.io',

    // Singapore regional prod
    'https://tracker.v2.mainnet.sng.vultr.icon.community': 'https://api.icon.community',
    'https://tracker.v2.berlin.sng.vultr.icon.community': 'https://api.berlin.icon.community',
    'https://tracker.v2.lisbon.sng.vultr.icon.community': 'https://api.lisbon.icon.community',
    'https://tracker.v2.sejong.sng.vultr.icon.community': 'https://api.sejong.icon.community',
    // Amsterdam regional prod
    'https://tracker.v2.mainnet.ams.vultr.icon.community': 'https://api.icon.community',
    'https://tracker.v2.berlin.ams.vultr.icon.community': 'https://api.berlin.icon.community',
    'https://tracker.v2.lisbon.ams.vultr.icon.community': 'https://api.lisbon.icon.community',
    'https://tracker.v2.sejong.ams.vultr.icon.community': 'https://api.sejong.icon.community',

    'https://tracker.berlin.geometry.io': 'https://berlin.net.solidwallet.io',  // RM
    'https://tracker.lisbon.geometry.io': 'https://lisbon.net.solidwallet.io',  // RM
}

export const nodeApiUrl = walletUrls[`${apiUrl}`] || 'https://ctz.solidwallet.io'


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
