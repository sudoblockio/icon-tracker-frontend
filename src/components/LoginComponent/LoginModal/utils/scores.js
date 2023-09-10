// smart contract addresses in the ICON Network
const mainnet = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  network: "cx0000000000000000000000000000000000000001",
  cps: "cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f"
};
const sejong = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  network: "cx0000000000000000000000000000000000000001",
  bnUSD: "cx5838cb516d6156a060f90e9a3de92381331ff024"
};
const berlin = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  network: "cx0000000000000000000000000000000000000001"
};
const lisbon = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  governance2: "cx0000000000000000000000000000000000000001"
};

const nid = {
  mainnet: 1,
  lisbon: 2,
  berlin: 7,
  sejong: 83
};

const apiHostnames = {
  geometry: "api.icon.geometry.io", // deprecated
  ctz: "ctz.solidwallet.io",
  icon: "api.icon.community",
  espanicon: "api.espanicon.team",
  sejong: "sejong.net.solidwallet.io",
  berlin: "berlin.net.solidwallet.io",
  lisbon: "lisbon.net.solidwallet.io",
  localhost: "localhost",
  node: "65.108.47.72"
};

const apiRoutes = {
  v3: "/api/v3",
  proposals: "/api/v1/governance/proposals"
};

const SCORES = {
  mainnet,
  sejong,
  berlin,
  lisbon,
  nid,
  apiRoutes,
  apiHostnames
};

export default SCORES;
