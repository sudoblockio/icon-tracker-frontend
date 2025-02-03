import {
  walletApiInstance,
  trackerApiInstance,
  getWalletApiUrl
} from "../api/restV3/config";
import {
  randomUint32,
  makeUrl,
  makeRewardsUrl,
  convertHexToValue
} from "../../utils/utils";
import config from "../../config";
import IconService from "icon-sdk-js";
import { requestJsonRpc } from "../../utils/connect";
import { icxGetScoreFromRPC } from "../api/restV3/icx";
import { CHAIN_CONTRACT_ADDRESS } from "../../utils/const";

export async function getStats() {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/stats`)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function coinGeckoMarketCap() {
  try {
    const mktcap = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=icon&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await mktcap.json();
    return data[0].market_cap;
  } catch (e) {
    console.log(e, "error");
  }
}

export async function coinGeckoCurrentUSD() {
  try {
    const icondetail = await fetch(
      "https://api.coingecko.com/api/v3/coins/icon"
    );
    const data = await icondetail.json();
    return data.market_data.current_price.usd;
  } catch (e) {
    console.log(e, "error");
  }
}

export async function getSrcCodeLink(addr) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/contracts/${addr}`)
      .then(result => {
        resolve(result.data.source_code_link);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getVerSrcCodeLink(addr) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/contracts/${addr}`)
      .then(result => {
        resolve(result.data.verified_source_code_link);
      })
      .catch(error => {
        reject(error);
      });
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
  console.trace("Contact list count");
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/contracts`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getContractABI(addr) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/contracts/${addr}`)
      .then(result => {
        resolve(result.data.abi);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getContractABIFromRPC(addr) {
  const response = await icxGetScoreFromRPC({
    address: addr
  });

  if (response.data != null && response.data.result != null) {
    return response.data.result;
  }

  return null;
}

export async function prepList(grade) {
  const trackerApi = await trackerApiInstance();
  const payload = {};
  if (grade) {
    payload.grade = grade;
  }
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/governance/preps?include_unregistered=true`, { params: payload })
      .then(result => {
        const nameSorted = (result.data || []).sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
        const delegatedSorted = nameSorted.sort((b, a) =>
          a.delegated < b.delegated ? -1 : a.delegated > b.delegated ? 1 : 0
        );
        const _data = delegatedSorted.map((item, index) => ({
          ...item,
          rank: index + 1
        }));
        resolve(_data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getPReps(query) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/governance/preps?include_unregistered=true`, { params: query })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getDelegationPrep(address) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`/api/v1/governance/preps/${address}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getPublicTreasury() {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: randomUint32(),
      method: "icx_getBalance",
      params: {
        address: "hx1000000000000000000000000000000000000000"
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getTotalSupply() {
  // return new Promise(() => {});
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: randomUint32(),
      method: "icx_getTotalSupply"
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getTokenTotalSupply(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      id: randomUint32(),
      params: {
        to: `${address}`,
        dataType: "call",
        data: {
          method: "totalSupply"
        }
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getTokenDecimals(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      id: randomUint32(),
      params: {
        to: `${address}`,
        dataType: "call",
        data: {
          method: "decimals"
        }
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

const score = {
  "https://berlin.net.solidwallet.io":
    "cx4a574176f82852487b547126b7a59874f5599acd",
  "https://lisbon.net.solidwallet.io":
    "cx59fd09b8fd87ad82961c29c4ff5e44773f629330",
  "https://api.icon.geometry.io": "cxfc514c18d8dd85f06e31509a1f231efc5d8939e0"
};
const nodeId = {
  "https://berlin.net.solidwallet.io": "0x7",
  "https://lisbon.net.solidwallet.io": "0x2",
  "https://api.icon.geometry.io": "0x1"
};
export const VerificationScore = score[config.rpcEndpoint];

export async function sendTransaction({
  fromAddress,
  contract,
  scoreAddress = VerificationScore,
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
  source_code_location,
  gradle_target,
  gradle_task,
  github_repo,
  github_org,
  github_directory,
  github_release,
  method = "verify",
  params = {
    city: `${city}`,
    contract_address: `${contract}`,
    country: `${country}`,
    discord: `${discord}`,
    facebook: `${facebook}`,
    github: `${github}`,
    keybase: `${keybase}`,
    license: `${license}`,
    long_description: `${long_description}`,
    p_rep_address: `${p_rep_address}`,
    reddit: `${reddit}`,
    short_description: `${short_description}`,
    steemit: `${steemit}`,
    team_name: `${team_name}`,
    telegram: `${telegram}`,
    twitter: `${twitter}`,
    website: `${website}`,
    wechat: `${wechat}`,
    youtube: `${youtube}`,
    zipped_source_code: zip,
    source_code_location: `${source_code_location}`,
    gradle_task: `${gradle_task}`,
    gradle_target: `${gradle_target}`,
    github_org: `${github_org}`,
    github_repo: `${github_repo}`,
    github_directory: `${github_directory}`,
    github_release: `${github_release}`
  }
}) {
  const nid = nodeId[config.rpcEndpoint];
  const { IconConverter, IconBuilder, IconAmount } = IconService;
  const builder = new IconBuilder.CallTransactionBuilder();
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
  const convertedToRaw = IconConverter.toRawTransaction(txData);
  let response = await requestJsonRpc(convertedToRaw);
  let txHash = response.result;
  // setTimeout(() => {
  //         window.location=`${window.location.origin}/transaction/${txHash}`
  // }, 5000)
}

export async function getBalanceOf(owner, tokenContract) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_call",
      id: randomUint32(),
      params: {
        to: `${tokenContract}`,
        dataType: "call",
        data: {
          method: "balanceOf",
          params: {
            _owner: owner
          }
        }
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.message) {
          resolve(error.response);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getLastBlock() {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      method: "icx_getLastBlock",
      id: randomUint32()
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export const getFailMessage = async (txHash, type) => {
  const param = {
    jsonrpc: "2.0",
    id: randomUint32(),
    method: "debug_getTrace",
    params: {
      txHash: `${txHash}`
    }
  };
  try {
    const apiUrl = await getWalletApiUrl();
    const response = await fetch(`${apiUrl}/api/v3d`, {
      method: "POST",
      body: JSON.stringify(param)
    });
    const data = await response.json();
    const errorList = [];
    data.result.logs.map(log => {
      errorList.push(log.msg);
    });
    return type === "wholemsg" ? data : errorList;
  } catch (e) {
    console.log(e, "Error from getFailMessage");
  }
};

export async function getStepPrice() {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: randomUint32(),
      method: "icx_call",
      params: {
        to: "cx0000000000000000000000000000000000000001",
        dataType: "call",
        data: {
          method: "getStepPrice"
        }
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
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
        resolve(0x0);
      });
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
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(makeUrl(`/v1/iiss/prep/main`, { count: 22 }))
      .then(result => {
        const { data } = result.data;
        const _data = data.map((item, index) => {
          if (!item.rank) {
            item.rank = index + 1;
          }
          return item;
        });
        resolve(_data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function prepSub() {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(makeUrl(`/v1/iiss/prep/sub`, { count: 100 }))
      .then(result => {
        const { data } = result.data;
        const _data = data.map((item, index) => {
          if (!item.rank) {
            item.rank = index + 1;
          }
          return item;
        });
        resolve(_data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function getBalance(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: randomUint32(),
      method: "icx_getBalance",
      params: {
        address
      }
    };
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getProposals(payload) {
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
    const walletApi = await walletApiInstance();
    // TEST: prod endpoint works not dev:

    let params = {
      start: "0x0",
      size: "0xA"
    };

    if (payload) {
      if (payload.pageNo)
        params.start = `0x${((payload.pageNo - 1) * payload.pageSize).toString(
          16
        )}`;
      if (payload.pageSize) params.size = `0x${payload.pageSize.toString(16)}`;
    }

    walletApi
      .post(
        `/api/v3`,
        JSON.stringify({
          jsonrpc: "2.0",
          id: randomUint32(),
          method: "icx_call",
          params: {
            from: "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            to: "cx0000000000000000000000000000000000000001",
            dataType: "call",
            data: {
              method: "getProposals",
              params
            }
          }
        })
      )
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.error(error);
        resolve({ proposals: [] });
      });
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
    const walletApi = await walletApiInstance();
    walletApi
      .post(
        `/api/v3`,
        JSON.stringify({
          jsonrpc: "2.0",
          id: randomUint32(),
          method: "icx_call",
          params: {
            from: "hx0000000000000000000000000000000000000000",
            to: "cx0000000000000000000000000000000000000001",
            dataType: "call",
            data: {
              method: "getProposal",
              params: {
                id: id
              }
            }
          }
        })
      )
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.error(error);
        resolve({});
      });
  });
}

export async function addressReward(payload) {
  const trackerApi = await trackerApiInstance();
  console.log(payload, "reward api payload");
  return new Promise((resolve, reject) => {
    trackerApi
      .get(
        makeRewardsUrl(`/api/v1/governance/rewards/${payload.address}`, payload)
      )
      .then(result => {
        console.log(result, "what result");
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
///
function makeRequestParams(
  method,
  params = null,
  height = null,
  contract = "cx0000000000000000000000000000000000000000"
) {
  const requestParam = {
    jsonrpc: "2.0",
    method: "icx_call",
    id: randomUint32(),
    params: {
      from: "hx0000000000000000000000000000000000000000",
      to: contract,
      dataType: "call",
      data: {
        method: method
      }
    }
  };

  if (params != null) {
    requestParam.params.data.params = params;
  }
  if (
    height != null &&
    typeof height === "string" &&
    height.slice(0, 2) === "0x"
  ) {
    requestParam.params["height"] = height;
  }

  return requestParam;
}

export async function getDelegation(payload) {
  let input = payload.address ? payload : { address: `${payload}` };
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getDelegation", {
      address: input.address
    });
    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.error(error, "here");
        resolve({
          error: { message: error.message }
        });
      });
  });
}

export async function getPRepRPC(address, height = null) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getPRep", { address: address }, height);

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.error(error);
        resolve({
          error: {
            message: error.message
          }
        });
      });
  });
}
export async function getPRepsRPC(height = null) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getPReps", null, height);

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.error(error);
        resolve({
          error: {
            message: error.message
          }
        });
      });
  });
}

export async function getBonders(payload) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getBonderList", {
      address: payload.address
    });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result.bonderList);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getBondList(payload) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getBond", { address: payload.address });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result.bonds);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getIISSInfo() {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getIISSInfo");

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getRevision() {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getRevision");

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getPRep(address) {
  if (!address) return {};

  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getPRep", { address });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        resolve({});
      });
  });
}

export async function getStake2(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getStake", { address: address });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function getStake(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("getStake", { address });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}

export async function queryIScore(address) {
  const walletApi = await walletApiInstance();
  return new Promise(resolve => {
    const param = makeRequestParams("queryIScore", { address });

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}




export async function queryNetworkInfo() {
  const walletApi = await walletApiInstance();

  return new Promise(resolve => {
    const param = {
      jsonrpc: "2.0",
      id: 1234,
      method: "icx_call",
      params: {
        to: CHAIN_CONTRACT_ADDRESS,
        dataType: "call",
        data: { method: "getNetworkInfo" }
      }
    };

    walletApi
      .post(`/api/v3`, JSON.stringify(param))
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        if (!!error.response) {
          resolve(error.response.data);
        } else {
          resolve({
            error: {
              message: error.message
            }
          });
        }
      });
  });
}
