// lib.js
//
// Imports
// const customRequest = require("./customRequest");
const customFetch = require("./customFetch");
const SCORES = require("./scores");

// General Functions
function makeJSONRPCRequestObj(method) {
  return {
    jsonrpc: "2.0",
    method: method,
    id: Math.ceil(Math.random() * 1000)
  };
}

function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

// function decimalToHex(number) {
//   return "0x" + number.toString(16);
// }

function fromHexInLoop(loopInHex) {
  let loopInBase2 = hexToDecimal(loopInHex);
  return loopInBase2 / 10 ** 18;
}

// SCORE methods
//
// Governance methods
async function getIcxBalance(address, decimals = 2) {
  const JSONRPCObject = JSON.stringify({
    ...makeJSONRPCRequestObj("icx_getBalance"),
    params: {
      address: address
    }
  });

  const request = await customFetch(SCORES.apiRoutes.v3, JSONRPCObject);
  if (request == null) {
    // Error was raised and handled inside customFetch, the returned value
    // is null. Here we continue returning null and let the code logic
    // after this handle the null values in the most appropiate way depending
    // on the code logic
    return request;
  } else {
    return Number(fromHexInLoop(request.result).toFixed(decimals));
  }
}

module.exports = { getIcxBalance };
