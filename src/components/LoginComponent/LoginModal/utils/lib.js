// lib.js
//
// Imports
const SCORES = require("./scores");
const { getBalance } = require("../../../../redux/store/iiss");

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
  const balanceRaw = await getBalance(address);
  const parsedBalance = Number(fromHexInLoop(balanceRaw).toFixed(decimals));
  return parsedBalance;
}

module.exports = { getIcxBalance };
