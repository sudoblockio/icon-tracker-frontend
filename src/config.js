let configJson;

// -------
// Berlin
// ----------------------------------------------------------------
let apiUrl = `https://tracker.berlin.geometry.io`
// export const nodeApiUrl = 'https://berlin.net.solidwallet.io'
// -------
// Mainnet
// ----------------------------------------------------------------
// let apiUrl = `https://tracker.icon.community`
// export const nodeApiUrl = 'https://api.icon.geometry.io'
// -------
//  Prod
// ----------------------------------------------------------------
// let apiUrl = `${window.location.origin}`

let walletUrls = {
    'https://tracker.icon.community': 'https://api.icon.geometry.io',
    'https://tracker.berlin.geometry.io': 'https://berlin.net.solidwallet.io',
    'https://tracker.lisbon.geometry.io': 'https://lisbon.net.solidwallet.io',
    'localhost:3000': 'https://api.icon.geometry.io'
}

export const nodeApiUrl = walletUrls[`${apiUrl}`]


switch (`${process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT}` + `-` + `${process.env.REACT_APP_NETWORK_NAME}` ) {
    case 'dev-mainnet':
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-mainnet' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl, 
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-sejong' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-berlin' :
        configJson =  {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-lisbon' :
        configJson =  {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": nodeApiUrl,
            "__IS_SOLO_VERSION": false}
        break
}

export default configJson;