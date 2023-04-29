
// This file is used to give sane defaults to the following options
// If the project is not run locally, then it will default to looking up conffig based on origin
// If --region or --network is supplied via `npm run start --network lisbon`, then that is used
// If environment variables are set (ie REACT_APP_RPC_ENDPOINT), use that
import defaults from "./configData";
const { origin, hostname } = window.location;

const isLocal = hostname === "localhost";
const defaultsCopy = defaults.map((x) => Object.assign({}, x));

// These are natural inputs via command line and are used to filter defaults
let region = process.env.REACT_APP_REGION || "";
let network = process.env.REACT_APP_NETWORK || "";

// We need to have the defaults list have the first entry be the one we use
if (isLocal) {
  // Here we are going filter based on above params
  for (let i = 0; i < defaults.length; i++) {
    if (defaults[i]['region'] !== region) {
      defaults.splice(i, 1);
      i--;
    } else if (defaults[i]['network'] !== network && network !== "") {
      defaults.splice(i, 1);
      i--;
    }
  }
} else {
  for (let i = 0; i < defaults.length; i++) {
    // Here we are going filter based on origin
    if (origin === defaults[i]['origin']) {
      break
    } else {
      defaults.splice(i, 1);
      i--;
    }
  }
}


const defaultSettings = defaults[0]

console.log('defaults');
console.log(defaultsCopy);
network = defaultSettings['network']
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || defaultSettings['apiEndpoint'];
const rpcEndpoint = process.env.REACT_APP_RPC_ENDPOINT || defaultSettings['rpcEndpoint'];
const wssEndpoint = process.env.REACT_APP_WSS_ENDPOINT || defaultSettings['wssEndpoint'];
const nid = process.env.REACT_APP_NID || defaultSettings['nid'];

const config = {
  apiEndpoint: apiEndpoint,
  rpcEndpoint: rpcEndpoint,
  wssEndpoint: wssEndpoint,
  nid: nid,
  network: network,
  region: region,
  setting: {
    mainnet: {
      apiEndpoint: defaultsCopy[0]["apiEndpoint"],
      rpcEndpoint: defaultsCopy[0]["rpcEndpoint"],
      wssEndpoint: defaultsCopy[0]["wssEndpoint"],
      nid: defaultsCopy[0]["nid"],
      network: defaultsCopy[0]["network"],
      region: defaultsCopy[0]["region"],
    },
    berlin: {
      apiEndpoint: defaultsCopy[1]["apiEndpoint"],
      rpcEndpoint: defaultsCopy[1]["rpcEndpoint"],
      wssEndpoint: defaultsCopy[1]["wssEndpoint"],
      nid: defaultsCopy[1]["nid"],
      network: defaultsCopy[1]["network"],
      region: defaultsCopy[1]["region"],
    },
    lisbon: {
      apiEndpoint: defaultsCopy[2]["apiEndpoint"],
      rpcEndpoint: defaultsCopy[2]["rpcEndpoint"],
      wssEndpoint: defaultsCopy[2]["wssEndpoint"],
      nid: defaultsCopy[2]["nid"],
      network: defaultsCopy[2]["network"],
      region: defaultsCopy[2]["region"],
    },
    sejong: {
      apiEndpoint: defaultsCopy[3]["apiEndpoint"],
      rpcEndpoint: defaultsCopy[3]["rpcEndpoint"],
      wssEndpoint: defaultsCopy[3]["wssEndpoint"],
      nid: defaultsCopy[3]["nid"],
      network: defaultsCopy[3]["network"],
      region: defaultsCopy[3]["region"],
    }
  }
}

console.log(config)
export default config;
