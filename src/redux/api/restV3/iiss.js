import { walletApiInstance, trackerApiInstance } from './config'
import { randomUint32, makeUrl } from 'utils/utils'

export async function getPRepList() {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_call",
            id: randomUint32(),
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": 'getPRepList',
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function getIISSInfo() {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_call",
            id: randomUint32(),
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": 'getIISSInfo',
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function getPRep(address) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": "getPRep",
                    "params": {
                        address      
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                resolve({})
                // if (!!error.response) {
                //     resolve(error.response.data);
                // }
                // else {
                //     resolve({
                //         error: {
                //             message: error.message
                //         }
                //     })
                // }
            })
    });
}

export async function getLastBlock() {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_getLastBlock",
            id: randomUint32(),
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function getStepPrice() {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            "method": "icx_call",
            "params": {
                "to": "cx0000000000000000000000000000000000000001",
                "dataType": "call",
                "data": {
                    "method": "getStepPrice"
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                // if (!!error.response) {
                //     resolve(error.response.data);
                // }
                // else {
                //     resolve({
                //         error: {
                //             message: error.message
                //         }
                //     })
                // }
                resolve(0x0)
            })
    });
}

export async function prepMain() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/main`, { count: 100 }))
            .then(result => {
                resolve(result.data.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function prepSub() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/sub`, { count: 100 }))
            .then(result => {
                resolve(result.data.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function prepList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/list`, { count: 200 }))
            .then(result => {
                resolve(result.data.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function getStake(address) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": "getStake",
                    "params": {
                        address      
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function queryIScore(address) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": "queryIScore",
                    "params": {
                        address      
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function getDelegation(address) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": "getDelegation",
                    "params": {
                        address      
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}

export async function getBalance(address) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_getBalance",
            params: {
                address
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                if (!!error.response) {
                    resolve(error.response.data);
                }
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    });
}