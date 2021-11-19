let configJson;
switch (`${process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT}` + `-` + `${process.env.REACT_APP_NETWORK_NAME}` ) {
    case 'dev-mainnet':
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": 'https://explorer.icon.geometry-dev.net',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-mainnet' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": 'https://explorer.icon.geometry.io',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
    case 'dev-sejong' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": 'https://explorer.sejong.geometry-dev.net',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod-sejong' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "TRACKER_API_URL": 'https://explorer.sejong.geometry.io',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
}

export default configJson;