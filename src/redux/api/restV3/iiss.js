import { walletApiInstance, trackerApiInstance } from './config'
import { randomUint32, makeUrl } from 'utils/utils'

export async function getPReps() {
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
                    "method": 'getPReps',
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                console.error(error)
                resolve({ preps: [] });
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
    if (!address) return {}

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

export async function iissPrepRepJsonActive(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/repJson`, payload))
            .then(result => {
                const { data } = result.data
                resolve(data)
            })
            .catch(error => {
                console.error(error)
                resolve({})
            })
    })   
}

export async function iissDelegateList(payload) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/delegate/list`, payload))
            .then(result => {
                const { data } = result.data
                const _data = data.map((item, index) => {
                    if (!item.rank) {
                        item.rank = index + 1
                    }
                    return item
                })
                resolve(_data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function prepMain() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/main`, { count: 22 }))
            .then(result => {
                const { data } = result.data
                const _data = data.map((item, index) => {
                    if (!item.rank) {
                        item.rank = index + 1
                    }
                    return item
                })
                resolve(_data)
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
                const { data } = result.data
                const _data = data.map((item, index) => {
                    if (!item.rank) {
                        item.rank = index + 1
                    }
                    return item
                })
                resolve(_data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export async function prepList(grade) {
    const trackerApi = await trackerApiInstance()
    const payload = { count: 500 }
    if (grade) {
        payload.grade = grade
    }
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v3/iiss/prep/list`, payload))
            .then(result => {
                const { data } = result.data
                const _data = (data || []).map((item, index) => {
                    if (!item.rank) {
                        item.rank = index + 1
                    }
                    return item
                })
                resolve(_data)
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
                console.error(error)
                resolve({ delegations: [] });
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