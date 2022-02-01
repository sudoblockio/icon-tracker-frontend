let configJson;
// const apiUrl = `${window.location.host}` === "localhost:3000" ? 'https://tracker.icon.community' : `${window.location.host}`
let apiUrl = `${window.location.host}`
// let apiUrl = `https://tracker.icon.community`

switch (`${process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT}` + `-` + `${process.env.REACT_APP_NETWORK_NAME}` ) {
    case 'dev-mainnet':
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": "https://api.icon.geometry.io",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-mainnet' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl, 
            "WALLET_API_URL": "https://api.icon.geometry.io",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-sejong' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-berlin' :
        configJson =  {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": "https://berlin.net.solidwallet.io",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-lisbon' :
        configJson =  {
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": apiUrl,
            "WALLET_API_URL": "https://lisbon.net.solidwallet.io",
            "__IS_SOLO_VERSION": false}
        break
}

export default configJson;