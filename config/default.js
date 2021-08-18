// !Important! All variables on this file are written directly to the frontend. 
// For more information on environment variables here: https://github.com/lorenwest/node-config/wiki/Environment-Variables
const env = process.env.NODE_ENV;

const app = {
    defaults: {
        secretPort: '',
        network: {
            mainnet: {
                URLPrefix: ''
            },
            sejong: {
                URLPrefix: ''

            }
        },
        backendAPIRoot: '',
        autoscaler: {
            enabled: true,
            maxReplicas: 25,
            averageCPU: 50,
        },

        service: {
            name: "icon-explorer-frontend-mainnet",
            type: "ClusterIP",
            // overrided by custom-environment-variables.js or local.js:
            externalPort: '',
            internalPort: ''
        },

        ingress: {
            enabled: true,
            regionalHost: '',
            apexHost: ''
        }

        }

    }
}


const config = app;
module.exports = config[env]