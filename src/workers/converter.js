import web3Utils from 'web3-utils'
onmessage = message => {
    const { type, payload } = message.data
    switch (type) {
        case 'removeQuotes':
            postMessage({
                type,
                payload: payload.replace(/"/gi, ""),
            })
            break;
        case 'utf8ToHex':
            postMessage({
                type,
                payload: web3Utils.utf8ToHex(payload),
            })
            break;
        case 'hexToUtf8':
            postMessage({
                type,
                payload: web3Utils.hexToUtf8(payload),
            })
            break;
        default:
    }
}