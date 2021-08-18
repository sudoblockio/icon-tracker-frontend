// About custom environment variables: 
// https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables
const env = process.env.NODE_ENV;

const mainnet = {
    // values are inject by node
    secretPort: "SECRET_VALUE",
    secretServer: 'SECRET_SERVER',
    backendAPIRoot: 'API_ROOT',
    settings: {
        mainnet: {
            __name: "MAINNET",
            __format: "js"
        }
    }
    
}

const sejong = {
    // values are inject by node
    secretPort: "SECRET_VALUE",
    secretServer: 'SECRET_SERVER',
    backendAPIRoot: 'API_ROOT',
    settings: {
        sejong: {
            __name: "SEJONG",
            __format: "js"
        }
    }
    
}

const config = {mainnet, sejong}
module.exports = config[env]