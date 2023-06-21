// smart contract addresses in the ICON Network
const mainnet = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  governance2: "cx0000000000000000000000000000000000000001",
  cps: "cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f"
};
const sejong = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  governance2: "cx0000000000000000000000000000000000000001",
  bnUSD: "cx5838cb516d6156a060f90e9a3de92381331ff024"
};
const berlin = {
  //
  governance: "cx0000000000000000000000000000000000000000",
  governance2: "cx0000000000000000000000000000000000000001",
  cps: "cx1cd2da25f9942fda5144e139bbda3e5108d3c083",
  bnusd: "cx1cd2da25f9942fda5144e139bbda3e5108d3c083"
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
  sejong: 83,
  local: 3
};

const scores = {
  mainnet,
  sejong,
  berlin,
  lisbon,
  nid
};

export default scores;
