let backendEndpoint;
// *** ready for env var:
switch (process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT) {
    case 'development':
        backendEndpoint = 'https://explorer.icon.geometry-dev.net'
        break
    case 'production' :
        backendEndpoint = 'https://explorer.icon.geometry.io'
        break
}
console.log(process.env, "the whole env")

export const configJson =
 {   
    "VERSION": "1.0.18_20190313_0",
    "To use below variables,": "remove two underbars at the front, and then set as you want.",
    "TRACKER_API_URL": `${backendEndpoint}`,
    "WALLET_API_URL": "https://wallet.icon.foundation",
    "__IS_SOLO_VERSION": false
}
