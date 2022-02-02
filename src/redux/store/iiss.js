import { walletApiInstance, trackerApiInstance, getTrackerApiUrl, getWalletApiUrl } from '../api/restV3/config'
import { randomUint32, makeUrl, makeRewardsUrl, convertHexToValue } from '../../utils/utils'
import checkIconex from 'check-iconex'
import IconService from 'icon-sdk-js';
import { requestAddress, requestJsonRpc } from '../../utils/connect';

export async function coinGeckoMarketCap () {
    try {
        const mktcap = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=icon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        const data = await mktcap.json()
        return data[0].market_cap
    }
    catch (e){
        console.log(e, "error")
    }
}
export async function coinGeckoCurrentUSD () {
    try{
        const icondetail = await fetch('https://api.coingecko.com/api/v3/coins/icon')
        const data = await icondetail.json()
        return data.market_data.current_price.usd
    }
    catch (e){
        console.log(e, "error")
    }
}   

export async function getSrcCodeLink (addr) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/contracts/${addr}`)
            .then(result => {
                resolve(result.data.source_code_link)
            })
            .catch(error => {
                reject(error)
            })
    });  
}

// export const getPrepStatusList = async () => {
//     try {
//         const response = await fetch("https://explorer.icon.geometry-dev.net/api/v1/metrics/node-state?network_name=mainnet");
//         const data = await response.json()
//         return data
//     } catch (e) {
//         console.log(e, "error")
//     }
//   }

export async function getContractListCount() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/contracts`)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    });  
}

export async function getTotalSupply() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/metrics/supply`)
            .then(result => {
                resolve(result.data.total_supply/Math.pow(10, 18))
            })
            .catch(error => {
                reject(error)
            })
    });  
}

export async function getContractABI (addr) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/contracts/${addr}`)
            .then(result => {
                resolve(result.data.abi)
            })
            .catch(error => {
                reject(error)
            })
    }); 
}



export async function prepList(grade) {
    const trackerApi = await trackerApiInstance()
    const payload = { count: 500 }
    if (grade) {
        payload.grade = grade
    }
    return new Promise((resolve, reject) => {
        trackerApi.get(`/api/v1/preps`)
            .then(result => {
                const { data } = result.data
                const nameSorted = (result.data || []).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
                const delegatedSorted = nameSorted.sort((b, a) => a.delegated < b.delegated ? -1 : a.delegated > b.delegated ? 1 : 0)
                const _data = delegatedSorted.map((item, index) => ({ ...item, rank: index + 1 }))
                resolve(_data)
                // const delegated = _data.filter(item => item.delegated !== 0).map((item, index) => ({ ...item, rank: index + 1 }))
                // const undelegated = _data.filter(item => item.delegated === 0).sort((a, b) => a.grade - b.grade)
                // resolve([...delegated, ...undelegated])
            })
            .catch(error => {
                reject(error)
            })
    })
}



export async function getPReps() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/preps`)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    });
        
}

export async function getDelegationPrep(address) {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject)  => {
        trackerApi.get(`/api/v1/preps/${address}`)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    });
        
}



export async function getDelegation(payload) {
    let input = payload.address? payload : {address:`${payload}`}
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
                    "method": 'getDelegation',
                    "params": {
                        "address": input.address
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                console.log(response, "here")
                resolve(response.data.result);
            })
            .catch(error => {
                console.error(error, "here")
                resolve({
                    error: 
                        {message: error.message}
                });
            })
    });
}

export async function getPRepsRPC() {
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
                resolve({
                    error: {
                        message: error.message
                    }
                })
            })
    });
}



export async function getTokenTotalSupply(address){
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_call",
            id: randomUint32(),
            params : {
                "to": `${address}`,
                "dataType": "call",
                "data": {
                    "method": "totalSupply"
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(convertHexToValue(response.data.result) );
            })
            .catch(error => {
                if(!!error.response){
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
    })
}

export async function getBondList(payload) {
    console.log(payload, "What payload")
    console.log("call function")
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_call",
            id: randomUint32(),
            params: {
                "to": "cx0000000000000000000000000000000000000000",
                "dataType": "call",
                "data": {
                    "method": 'getBond',
                    "params": {
                        "address": payload.address
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                console.trace(response, "What response")
                resolve(response.data.result.bonds);
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

// if there is a transaction result, post to v3
//berlin
export const VerificationScore=`cxdd61820cd8e5e13f65ee368ffea34b3aa1d94461`
// export const VerificationScore = 'cx84c88b975f60aeff9ee534b5efdb69d66d239596'
// lisbon
// export const VerificationScore = 'cx338322697c252ec776bf81157f55e1f47beb7d78'
export async function sendTransaction({
    // write function to get logged in wallets public_key
    // connected users wallet address
    fromAddress,
    // actual contract needs to be here :
    contract,
    scoreAddress = VerificationScore,
    // set to zero because we are just signing
    icxAmount = 0, 
    zip,
    city,
    country,
    discord,
    facebook,
    github,
    keybase,
    license,
    long_description,
    p_rep_address,
    reddit,
    short_description,
    steemit,
    team_name,
    telegram,
    twitter,
    website,
    wechat,
    youtube,
    method = "verify",
    params = { 
    "city": `${city}`,
    "contract_address": `cx03f38c36460b2e9ce68a67f83fc9608690b1f64e`,
    "country": `${country}`,
    "discord": `${discord}`,
    "facebook": `${facebook}`,
    "github": `${github}`,
    "keybase": `${keybase}`,
    "license": `${license}`,
    "long_description": `${long_description}`,
    "p_rep_address": `${p_rep_address}`,
    "reddit": `${reddit}`,
    "short_description": `${short_description}`,
    "steemit": `${steemit}`,
    "team_name": `${team_name}`,
    "telegram": `${telegram}`,
    "twitter": `${twitter}`,
    "website": `${website}`,
    "wechat": `${wechat}`,
    "youtube": `${youtube}`,
    "zipped_source_code": "0x"+zip,
    "source_code_location": "./irc31-token/build/libs/irc31-token-0.1.0-optimized.jar"
    }
}){
    // berlin
    // const nid =7
    // lisbon:
    const nid=7
    const { IconConverter, IconBuilder, IconAmount } = IconService
    const builder = new IconBuilder.CallTransactionBuilder;
    const txData = builder 
        .from(fromAddress)
        .to(scoreAddress)
        .nid(IconConverter.toBigNumber(nid))
        .timestamp(new Date().getTime() * 1000)
        .stepLimit(IconConverter.toBigNumber(100000000))
        .version(IconConverter.toBigNumber(3))
        .method(method)
        .params(params)
        .value(IconAmount.of(icxAmount, IconAmount.Unit.ICX).toLoop())
        .build();
        const convertedToRaw = IconConverter.toRawTransaction(txData)
        let response = await requestJsonRpc(convertedToRaw)
        let txHash = response.result
        // setTimeout(() => {
        //         window.location.href=`${window.location.hostname}/transaction/${txHash}`
        // }, 1000)
}




export async function getBalanceOf(owner, tokenContract) {
    const walletApi = await walletApiInstance()
    return new Promise(resolve => {
        const param = {
            jsonrpc: "2.0",
            method: "icx_call",
            id: randomUint32(),
            params : {
                "to": `${tokenContract}`,
                "dataType": "call",
                "data": {
                    "method": "balanceOf",
                    "params": {
                            "_owner": owner
                    }
                }
            }
        }
        walletApi.post(`/api/v3`, JSON.stringify(param))
            .then(response => {
                resolve(response.data.result)
            })
            .catch(error => {
                if (!!error.message) {
                    resolve(error.response)
                } 
                else {
                    resolve({
                        error: {
                            message: error.message
                        }
                    })
                }
            })
    })
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

export const getFailMessage = async (txHash) => {
    const param = {
        jsonrpc: "2.0",
        id: randomUint32(),
        "method": "debug_getTrace",
        "params": {
            "txHash": `${txHash}`,
        }
    }
    try {
        const apiUrl = await getWalletApiUrl()
        const response = await fetch(`${apiUrl}/api/v3d`, {
            method: 'POST',
            body: JSON.stringify(param)
        })
        const data = await response.json()
        const errorList = []
        data.result.logs.map(log => {
            log.level === 0 && errorList.push(log.msg) 
        })
        return errorList;
    } catch(e) {
        console.log(e, "Error from getFailMessage")

    }
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

// export async function iissPrepRepJsonActive(payload) {
//     const trackerApi = await trackerApiInstance()
//     return new Promise((resolve, reject) => {
//         trackerApi.get(makeUrl(`/v3/iiss/prep/repJson`, payload))
//             .then(result => {
//                 const { data } = result.data
//                 resolve(data)
//             })
//             .catch(error => {
//                 console.error(error)
//                 resolve({})
//             })
//     })
// }

export async function prepMain() {
    const trackerApi = await trackerApiInstance()
    return new Promise((resolve, reject) => {
        trackerApi.get(makeUrl(`/v1/iiss/prep/main`, { count: 22 }))
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
        trackerApi.get(makeUrl(`/v1/iiss/prep/sub`, { count: 100 }))
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


export async function getProposals() {
    return new Promise(async resolve => {
        // const mock = {
        //     "proposals": [
        //         {
        //             "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //             "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
        //             "proposerName": "Icon Foundation",
        //             "status": "0x0",
        //             "startBlockHeight": "0x1",
        //             "endBlockHeight": "0x65",
        //             "vote": {
        //                 "agree": {
        //                     "count": "0x8",
        //                     "amount": "0x12312341234a"
        //                 },
        //                 "disagree": {
        //                     "count": "0x6",
        //                     "amount": "0x12312341234a"
        //                 },
        //                 "noVote": {
        //                     "count": "0x8",
        //                     "amount": "0x12312341234a"
        //                 },
        //             },
        //             "contents": {
        //                 "title": "Disqualify P-Rep A",
        //                 "description": "P-Rep A does not maintain node",
        //                 "type": "0x1",
        //                 "value": {
        //                     "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
        //                 }
        //             }
        //         }
        //     ]
        // }
        // resolve(mock)
        const walletApi = await walletApiInstance()
        // TEST: prod endpoint works not dev:
        walletApi.post(`/api/v3`, JSON.stringify({
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000001",
                "dataType": "call",
                "data": {
                    "method": "getProposals",
                }
            }
        }))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                console.error(error)
                resolve({ proposals: [] });
            })
    });
}

export async function getProposal(id) {
    return new Promise(async resolve => {
        // const mock = {
        //     "id": id,
        //     "proposer": "hxbe258ceb872e08851f1f59694dac2558708ece11",
        //     "proposerName": "Icon Foundation",
        //     "status": "0x0",
        //     "startBlockHeight": "0x1",
        //     "endBlockHeight": "0x65",
        //     "vote": {
        //         "agree": {
        //             "list": [{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330133",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330135",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563adcf330134",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330133",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330132",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330131",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             }],
        //             "amount": "0x12345"
        //         },
        //         "disagree": {
        //             "list": [{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330136",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330136",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330136",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             },{
        //                 "id": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        //                 "timestamp": "0x563a6cf330136",
        //                 "address": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb",
        //                 "name": "Icon Foundation",
        //                 "amount": "0x1"
        //             }],
        //             "amount": "0x22346"
        //         },
        //         "noVote": {
        //             "list": ["hx31258ceb872e08851f1f59694dac2558708ece11", "hx31258ceb872e08851f1f59694dac2558708eceff"],
        //             "amount": "0x12312341234a"
        //         },
        //     },
        //     "contents": {
        //         "title": "Disqualify P-Rep A",
        //         "description": "P-Rep A does not maintain node",
        //         "type": "0x1",
        //         "value": {
        //             "address": "hxbe258ceb872e08851f1f59694dac2558708ece11"
        //         }
        //     }
        // }
        // resolve(mock)
        const walletApi = await walletApiInstance()
        walletApi.post(`/api/v3`, JSON.stringify({
            jsonrpc: "2.0",
            id: randomUint32(),
            method: "icx_call",
            params: {
                "from": "hx0000000000000000000000000000000000000000",
                "to": "cx0000000000000000000000000000000000000001",
                "dataType": "call",
                "data": {
                    "method": "getProposal",
                    "params": {
                        "id": id
                    }
                }
            }
        }))
            .then(response => {
                resolve(response.data.result);
            })
            .catch(error => {
                console.error(error)
                resolve({});
            })
    });
}

export async function addressReward(payload) {
    const trackerApi = await trackerApiInstance()
    console.log(payload, "reward api payload")
    return new Promise((resolve, reject) => {
        trackerApi.get(makeRewardsUrl(`/api/v1/governance/rewards/${payload.address}`, payload))
            .then(result => {
                console.log(result, "what result")
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}



