let configJson;
switch (process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT || process.env.NODE_ENV) {
    case 'dev' || 'development':
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "To use below variables,": "remove two underbars at the front, and then set as you want.",
            "TRACKER_API_URL": 'http://explorer.icon.geometry-dev.net',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
    case 'prod' :
        configJson =  {   
            "VERSION": "1.0.18_20190313_0",
            "To use below variables,": "remove two underbars at the front, and then set as you want.",
            "TRACKER_API_URL": 'http://explorer.icon.geometry.io',
            "WALLET_API_URL": "https://wallet.icon.foundation",
            "__IS_SOLO_VERSION": false}
        break
}

export default configJson;