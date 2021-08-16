const env = process.env.NODE_ENV;

const dev = {
    app = {
        // all process.env variables are Strings, 
        // if a number is needed, use parseInt
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db = {
        // test values
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: name: process.env.DEV_DB_NAME || 'db'
    }
}

const test = {
    app = {
        port: 3000
    },
    db = {
        // test values
        host: localhost,
        port: 3000
    }
}

const config = {
    dev,
    test
}

module.exports = config[env]