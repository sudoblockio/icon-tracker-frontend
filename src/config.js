let configJson;

// -*-*-*--*-*-*--*-*-*--*-*-*-*-*-*--*-*-*--*-*-*--*-*-*-
// -*-*-*- Berlin Dev Vars-*-*-*-:
// let apiUrl = `https://tracker.berlin.geometry.io`
// export const nodeApiUrl = 'https://berlin.net.solidwallet.io'
// -*-*-*- Mainnet Dev Vars-*-*-*-:
// let apiUrl = `https://tracker.icon.community`
// export const nodeApiUrl = 'https://api.icon.geometry.io'
// -*-*-*--*-*-*--*-*-*--*-*-*-*-*-*--*-*-*--*-*-*--*-*-*-
// -*-*-*- Prod Env Vars-*-*-*-:
let apiUrl = `${window.location.origin}`
export const nodeApiUrl = walletUrls[`${apiUrl}`]

let walletUrls = {
    'https://tracker.icon.community': 'https://api.icon.geometry.io',
    'https://tracker.berlin.geometry.io': 'https://berlin.net.solidwallet.io',
    'https://tracker.lisbon.geometry.io': 'https://lisbon.net.solidwallet.io',
    'localhost:3000': 'https://api.icon.geometry.io'
}


//this switch case isn't being hit anymore. 
// one possibility is to add a default case and keep same format in case 
// someone wants to use env vars in the future. 
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