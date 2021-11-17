let backendEndpoint;

if (process.env.NODE_ENV === 'development'){
    backendEndpoint = 'https://explorer.icon.geometry-dev.net'
} else if (process.env.NODE_ENV === 'production'){
    backendEndpoint = 'https://explorer.icon.geometry.net'
}

export const configJson =
 {   
    "VERSION": "1.0.18_20190313_0",
    "To use below variables,": "remove two underbars at the front, and then set as you want.",
    "TRACKER_API_URL": `${backendEndpoint}`,
    "WALLET_API_URL": "https://wallet.icon.foundation",
    "__IS_SOLO_VERSION": false
}
