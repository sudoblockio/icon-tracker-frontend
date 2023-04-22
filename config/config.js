const { origin, hostname } = window.location;

let config = {
  origin,
  hostname,
};

const ApiEndPointMap = {
  localhost: "https://api.icon.community",
  "tracker.icon.community": "https://api.icon.community",

  "tracker.berlin.icon.community": "https://api.berlin.icon.community",
  "tracker.lisbon.icon.community": "https://api.lisbon.icon.community",
  "tracker.sejong.icon.community": "https://api.sejong.icon.community",

  // Singapore regional prod
  "tracker.v2.mainnet.sng.vultr.icon.community": "https://api.mainnet.sng.vultr.icon.community",
  "tracker.v2.berlin.sng.vultr.icon.community": "https://api.berlin.sng.vultr.icon.community",
  "tracker.v2.lisbon.sng.vultr.icon.community": "https://api.lisbon.sng.vultr.icon.community",
  "tracker.v2.sejong.sng.vultr.icon.community": "https://api.sejong.sng.vultr.icon.community",

  // Amsterdam regional prod
  "tracker.v2.mainnet.ams.vultr.icon.community": "https://api.mainnet.ams.vultr.icon.community",
  "tracker.v2.berlin.ams.vultr.icon.community": "https://api.berlin.ams.vultr.icon.community",
  "tracker.v2.lisbon.ams.vultr.icon.community": "https://api.lisbon.ams.vultr.icon.community",
  "tracker.v2.sejong.ams.vultr.icon.community": "https://api.sejong.ams.vultr.icon.community",

  "tracker.berlin.geometry.io": "https://berlin.net.solidwallet.io", // RM
  "tracker.lisbon.geometry.io": "https://lisbon.net.solidwallet.io", // RM
};

const isLocal = hostname === "localhost";
const socketEndPoint = `wss://${isLocal ? "tracker.icon.community" : hostname}`;

switch (process.env.REACT_APP_ENV) {
  case "PROD":
    config = { ...config, apiBaseUrl: ApiEndPointMap[hostname], socketUrl: socketEndPoint };
    break;

  case "CUSTOM":
    config = { ...config };
    break;

  default:
    config = {};
}

export default config;
