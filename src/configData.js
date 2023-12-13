// File created to separate the data from the execution code of the
// config.js file
const defaults = [
    //
    // Global
    //
    {
        region: '',
        network: 'mainnet',
        origin: 'https://tracker.icon.community',
        rpcEndpoint: 'https://api.icon.community',
        apiEndpoint: 'https://tracker.icon.community',
        wssEndpoint: 'wss://tracker.icon.community',
        nid: 1,
    },
    {
        region: '',
        network: 'berlin',
        origin: 'https://tracker.berlin.icon.community',
        rpcEndpoint: 'https://api.berlin.icon.community',
        apiEndpoint: 'https://tracker.berlin.icon.community',
        wssEndpoint: 'wss://tracker.berlin.icon.community',
        nid: 7,
    },
    {
        region: '',
        network: 'lisbon',
        origin: 'https://tracker.lisbon.icon.community',
        rpcEndpoint: 'https://api.lisbon.icon.community',
        apiEndpoint: 'https://tracker.lisbon.icon.community',
        wssEndpoint: 'wss://tracker.lisbon.icon.community',
        nid: 2,
    },
    //
    // Ams
    //
    {
        region: 'ams',
        network: 'mainnet',
        origin: 'https://tracker.v2.mainnet.ams.vultr.icon.community',
        rpcEndpoint: 'https://api.mainnet.ams.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.mainnet.ams.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.mainnet.ams.vultr.icon.community',
        nid: 1,
    },
    {
        region: 'ams',
        network: 'berlin',
        origin: 'https://tracker.v2.berlin.ams.vultr.icon.community',
        rpcEndpoint: 'https://api.berlin.ams.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.berlin.ams.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.berlin.ams.vultr.icon.community',
        nid: 7,
    },
    {
        region: 'ams',
        network: 'lisbon',
        origin: 'https://tracker.v2.lisbon.ams.vultr.icon.community',
        rpcEndpoint: 'https://api.lisbon.ams.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.lisbon.ams.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.lisbon.ams.vultr.icon.community',
        nid: 2,
    },
    //
    // Sng
    //
    {
        region: 'sng',
        network: 'mainnet',
        origin: 'https://tracker.v2.mainnet.sng.vultr.icon.community',
        rpcEndpoint: 'https://api.mainnet.sng.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.mainnet.sng.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.mainnet.sng.vultr.icon.community',
        nid: 1,
    },
    {
        region: 'sng',
        network: 'berlin',
        origin: 'https://tracker.v2.berlin.sng.vultr.icon.community',
        rpcEndpoint: 'https://api.berlin.sng.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.berlin.sng.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.berlin.sng.vultr.icon.community',
        nid: 7,
    },
    {
        region: 'sng',
        network: 'lisbon',
        origin: 'https://tracker.v2.lisbon.sng.vultr.icon.community',
        rpcEndpoint: 'https://api.lisbon.sng.vultr.icon.community',
        apiEndpoint: 'https://tracker.v2.lisbon.sng.vultr.icon.community',
        wssEndpoint: 'wss://tracker.v2.lisbon.sng.vultr.icon.community',
        nid: 2,
    },
    //
    // Global
    //
    {
        region: '',
        network: 'mainnet',
        origin: 'https://tracker.iconblockchain.xyz',
        rpcEndpoint: 'https://api.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.iconblockchain.xyz',
        nid: 1,
    },
    {
        region: '',
        network: 'berlin',
        origin: 'https://tracker.berlin.iconblockchain.xyz',
        rpcEndpoint: 'https://api.berlin.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.berlin.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.berlin.iconblockchain.xyz',
        nid: 7,
    },
    {
        region: '',
        network: 'lisbon',
        origin: 'https://tracker.lisbon.iconblockchain.xyz',
        rpcEndpoint: 'https://api.lisbon.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.lisbon.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.lisbon.iconblockchain.xyz',
        nid: 2,
    },
    //
    // Ams
    //
    {
        region: 'ams',
        network: 'mainnet',
        origin: 'https://tracker.v2.mainnet.ams.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.mainnet.ams.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.mainnet.ams.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.mainnet.ams.vultr.iconblockchain.xyz',
        nid: 1,
    },
    {
        region: 'ams',
        network: 'berlin',
        origin: 'https://tracker.v2.berlin.ams.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.berlin.ams.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.berlin.ams.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.berlin.ams.vultr.iconblockchain.xyz',
        nid: 7,
    },
    {
        region: 'ams',
        network: 'lisbon',
        origin: 'https://tracker.v2.lisbon.ams.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.lisbon.ams.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.lisbon.ams.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.lisbon.ams.vultr.iconblockchain.xyz',
        nid: 2,
    },
    //
    // Sng
    //
    {
        region: 'sng',
        network: 'mainnet',
        origin: 'https://tracker.v2.mainnet.sng.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.mainnet.sng.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.mainnet.sng.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.mainnet.sng.vultr.iconblockchain.xyz',
        nid: 1,
    },
    {
        region: 'sng',
        network: 'berlin',
        origin: 'https://tracker.v2.berlin.sng.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.berlin.sng.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.berlin.sng.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.berlin.sng.vultr.iconblockchain.xyz',
        nid: 7,
    },
    {
        region: 'sng',
        network: 'lisbon',
        origin: 'https://tracker.v2.lisbon.sng.vultr.iconblockchain.xyz',
        rpcEndpoint: 'https://api.lisbon.sng.vultr.iconblockchain.xyz',
        apiEndpoint: 'https://tracker.v2.lisbon.sng.vultr.iconblockchain.xyz',
        wssEndpoint: 'wss://tracker.v2.lisbon.sng.vultr.iconblockchain.xyz',
        nid: 2,
    },
]

export default defaults
