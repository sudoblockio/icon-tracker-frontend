
// This file is used to give sane defaults to the following options
// If the project is not run locally, then it will default to looking up conffig based on origin
// If --region or --network is supplied via `npm run start --network lisbon`, then that is used
// If environment variables are set (ie REACT_APP_RPC_ENDPOINT), use that

const { origin, hostname } = window.location;

const isLocal = hostname === "localhost";

const defaults = [
  //
  // Global
  //
  {
    region: "",
    network: "mainnet",
    origin: "https://tracker.icon.community",
    rpcEndpoint: "https://api.icon.community",
    apiEndpoint: "https://tracker.icon.community",
    wssEndpoint: "wss://tracker.icon.community",
    nid: 1
  },
  {
    region: "",
    network: "berlin",
    origin: "https://tracker.berlin.icon.community",
    rpcEndpoint: "https://api.berlin.icon.community",
    apiEndpoint: "https://tracker.berlin.icon.community",
    wssEndpoint: "wss://tracker.berlin.icon.community",
    nid: 7
  },
  {
    region: "",
    network: "lisbon",
    origin: "https://tracker.lisbon.icon.community",
    rpcEndpoint: "https://api.lisbon.icon.community",
    apiEndpoint: "https://tracker.lisbon.icon.community",
    wssEndpoint: "wss://tracker.lisbon.icon.community",
    nid: 2
  },
  {
    region: "",
    network: "sejong",
    origin: "https://tracker.sejong.icon.community",
    rpcEndpoint: "https://api.sejong.icon.community",
    apiEndpoint: "https://tracker.sejong.icon.community",
    wssEndpoint: "wss://tracker.sejong.icon.community",
    nid: 83
  },
  //
  // Ams
  //
  {
    region: "ams",
    network: "mainnet",
    origin: "https://tracker.v2.mainnet.ams.vultr.icon.community",
    rpcEndpoint: "https://api.mainnet.ams.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.mainnet.ams.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.mainnet.ams.vultr.icon.community",
    nid: 1
  },
  {
    region: "ams",
    network: "berlin",
    origin: "https://tracker.v2.berlin.ams.vultr.icon.community",
    rpcEndpoint: "https://api.berlin.ams.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.berlin.ams.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.berlin.ams.vultr.icon.community",
    nid: 7
  },
  {
    region: "ams",
    network: "lisbon",
    origin: "https://tracker.v2.lisbon.ams.vultr.icon.community",
    rpcEndpoint: "https://api.lisbon.ams.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.lisbon.ams.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.lisbon.ams.vultr.icon.community",
    nid: 2
  },
  {
    region: "ams",
    network: "sejong",
    origin: "https://tracker.v2.sejong.ams.vultr.icon.community",
    rpcEndpoint: "https://api.sejong.ams.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.sejong.ams.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.sejong.ams.vultr.icon.community",
    nid: 83
  },
  //
  // Sng
  //
  {
    region: "sng",
    network: "mainnet",
    origin: "https://tracker.v2.mainnet.sng.vultr.icon.community",
    rpcEndpoint: "https://api.mainnet.sng.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.mainnet.sng.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.mainnet.sng.vultr.icon.community",
    nid: 1
  },
  {
    region: "sng",
    network: "berlin",
    origin: "https://tracker.v2.berlin.sng.vultr.icon.community",
    rpcEndpoint: "https://api.berlin.sng.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.berlin.sng.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.berlin.sng.vultr.icon.community",
    nid: 7
  },
  {
    region: "sng",
    network: "lisbon",
    origin: "https://tracker.v2.lisbon.sng.vultr.icon.community",
    rpcEndpoint: "https://api.lisbon.sng.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.lisbon.sng.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.lisbon.sng.vultr.icon.community",
    nid: 2
  },
  {
    region: "sng",
    network: "sejong",
    origin: "https://tracker.v2.sejong.sng.vultr.icon.community",
    rpcEndpoint: "https://api.sejong.sng.vultr.icon.community",
    apiEndpoint: "https://tracker.v2.sejong.sng.vultr.icon.community",
    wssEndpoint: "wss://tracker.v2.sejong.sng.vultr.icon.community",
    nid: 83
  },
]

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
}

console.log(config)
export default config;
