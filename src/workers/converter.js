import { IconConverter } from 'icon-sdk-js'

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
                payload: IconConverter.toHex(payload),

                
            })
            break;
        case 'hexToUtf8':
            postMessage({
                type,
                payload: IconConverter.toUtf8(payload),
            })
            break;
        default:
    }
}