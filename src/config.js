let configJson;
// const apiUrl = `${window.location.origin}` === "http://localhost:3000" ? 'https://tracker.icon.community' : `${window.location.origin}`
let apiUrl = `${window.location.origin}`
// let apiUrl = `https://tracker.icon.community`
let walletUrls = {
    'https://tracker.icon.community': 'https://api.icon.geometry.io',
    'https://tracker.berlin.geometry.io': 'https://berlin.net.solidwallet.io',
    'https://tracker.lisbon.geometyr.io': 'https://lisbon.net.solidwallet.io',
    'localhost:3000': 'https://api.icon.geometry.io'
}
let nodeApiUrl = walletUrls[`${apiUrl}`]
console.log(nodeApiUrl, "node api url")
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