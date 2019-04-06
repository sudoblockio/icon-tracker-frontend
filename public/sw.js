console.log('sw.js')

self.addEventListener('install', event => {
    console.log('install', event)
});
self.addEventListener('activate', event => {
    console.log('activate', event)
});
self.addEventListener('notificationclick', async event => {
    console.log('notificationclick', event, clients)
    event.notification.close()
    const { currentTarget, notification } = event
    const { data } = notification
    const { origin } = currentTarget
    if (data) {
        notification.close()
        clients.openWindow(`${origin}/transaction/${data}`)
    }
});
self.addEventListener('push', async event => {
    console.log('push', event)
    // const data = event.data.json()
    // const { address, txHash } = data
    // const { currentTarget } = event
    // const { origin } = currentTarget
    const { currentTarget } = event
    const { navigator } = currentTarget
    const { platform } = navigator
    const isWindow = platform === 'Win32'

    const origin = 'https://trackerdev.icon.foundation'
    const address = 'hx04d669879227bb24fc32312c408b0d5503362ef0'
    // const txHash = '0xcea5597417d9fb3b5f5e4496422e6a37c0ed1478685c71cf0d0a04f96c7b8331' // icx
    // const txHash = '0xbeee59c0a21446f09581205f4dad86b056fbf64df341e0d8a796a4c49aa4d1b3' // message
    // const txHash = '0x39e75c17eecce36ae967e66760738ecbfb57de60c8dc3b8c297f50c5841379dc' // image
    // const txHash = '0xa8f85977ac22bdb57d8eb3325e28abfe979ab2f21c02a46391c9177dce31d4c7' // token
    const txHash = '0xcd956c00792d4a97f0d88ba9e4565a43a2590f57d7a9b12c65e80b6e9f2504d9' // call
    // const txHash = '0xce17860989cb8c0c3d96ac70c7894aba9a153c7f0ec9697163e391b4b330854e' // deploy
    
    const { title, image } = await makeData(origin, address, txHash)
    const options = { 
        data: txHash, 
        icon: isWindow ? './logo.png' : image
    };
    setTimeout(() => {
        self.registration.showNotification(title, options)
    }, 100);
});

const DEPLOY_TX_TYPE = {
    "3": "Contract created",
    "4": "Contract updated",
    "5": "Contract accepted",
    "6": "Contract rejected",
    "7": "Update accepted",
    "8": "Update rejected",
    "9": "Update cancelled"
}

async function makeData(origin, address, txHash) {
    const txDetail = await getTxDetail(origin, txHash)
    console.log(txDetail)
    const { fromAddr, dataType } = txDetail
    switch (dataType) {
        case 'icx': {
            const { amount } = txDetail
            const operation = (fromAddr === address) ? 'Withdraw' : 'Deposit'
            return { title: `${operation} ${amount} ICX` }
        }
        case 'message': {
            const { isSafe, dataString } = txDetail
            const removed = dataString.replace(/\"/gi, "");
            const decoded = toUtf8(removed)
            const isImage = isSafe && decoded.indexOf('data:image') === 0
            return {
                title: isImage ? 'Image' : decoded,
                image: isImage ? decoded : undefined
            }
        }
        case 'call': {
            const { tokenTxList } = txDetail
            const { length } = tokenTxList
            if (length !== 0) {
                const tokenTx = tokenTxList[0]
                const { quantity, fromAddr: tokenFromAddr, symbol } = tokenTx
                const operation = (tokenFromAddr === address) ? 'Withdraw' : 'Deposit'
                return { title: `${operation} ${quantity} ${symbol}${length > 1 ? ` (${length})` : ''}` }
            }
            else {
                const { dataString, targetContractAddr } = txDetail
                const parsed = JSON.parse(dataString)
                const { method } = parsed
                return { title: `${method} called on ${targetContractAddr}` }
            }
        }
        case 'deploy': {
            const { txType } = txDetail
            return { title: DEPLOY_TX_TYPE[txType] }
        }
        default: {
            return 'title'
        }
    }
}

async function getTxDetail(host, txHash) {
    try {
        const url = `${host}/v3/transaction/txDetail?txHash=${txHash}`
        const response = await fetch(url)
        const { result, data, description } = await response.json()
        if (result === '200') {
            return data
        }
        else {
            throw new Error(description)
        }
    }
    catch (e) {
        console.error(e)
        return {}
    }
}

function toUtf8(value) {
    let str = '';
    let i = 0; const
        l = value.length;
    if (value.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i += 2) {
        const code = parseInt(value.substr(i, 2), 16);
        if (code === 0) break;
        str += String.fromCharCode(code);
    }

    // return utf8.decode(str);
    return utf8decode(str);
}

// utf8 module

var stringFromCharCode = String.fromCharCode;

// Taken from https://mths.be/punycode
function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    var value;
    var extra;
    while (counter < length) {
        value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // high surrogate, and there is a next character
            extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                // unmatched surrogate; only append this code unit, in case the next
                // code unit is the high surrogate of a surrogate pair
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}

// Taken from https://mths.be/punycode
function ucs2encode(array) {
    var length = array.length;
    var index = -1;
    var value;
    var output = '';
    while (++index < length) {
        value = array[index];
        if (value > 0xFFFF) {
            value -= 0x10000;
            output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
            value = 0xDC00 | value & 0x3FF;
        }
        output += stringFromCharCode(value);
    }
    return output;
}

function checkScalarValue(codePoint) {
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
        throw Error(
            'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
            ' is not a scalar value'
        );
    }
}
/*--------------------------------------------------------------------------*/

function createByte(codePoint, shift) {
    return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
}

function encodeCodePoint(codePoint) {
    if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
        return stringFromCharCode(codePoint);
    }
    var symbol = '';
    if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
        symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
    }
    else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
        checkScalarValue(codePoint);
        symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
        symbol += createByte(codePoint, 6);
    }
    else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
        symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
        symbol += createByte(codePoint, 12);
        symbol += createByte(codePoint, 6);
    }
    symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
    return symbol;
}

function utf8encode(string) {
    var codePoints = ucs2decode(string);
    var length = codePoints.length;
    var index = -1;
    var codePoint;
    var byteString = '';
    while (++index < length) {
        codePoint = codePoints[index];
        byteString += encodeCodePoint(codePoint);
    }
    return byteString;
}

/*--------------------------------------------------------------------------*/

function readContinuationByte() {
    if (byteIndex >= byteCount) {
        throw Error('Invalid byte index');
    }

    var continuationByte = byteArray[byteIndex] & 0xFF;
    byteIndex++;

    if ((continuationByte & 0xC0) == 0x80) {
        return continuationByte & 0x3F;
    }

    // If we end up here, it’s not a continuation byte
    throw Error('Invalid continuation byte');
}

function decodeSymbol() {
    var byte1;
    var byte2;
    var byte3;
    var byte4;
    var codePoint;

    if (byteIndex > byteCount) {
        throw Error('Invalid byte index');
    }

    if (byteIndex == byteCount) {
        return false;
    }

    // Read first byte
    byte1 = byteArray[byteIndex] & 0xFF;
    byteIndex++;

    // 1-byte sequence (no continuation bytes)
    if ((byte1 & 0x80) == 0) {
        return byte1;
    }

    // 2-byte sequence
    if ((byte1 & 0xE0) == 0xC0) {
        byte2 = readContinuationByte();
        codePoint = ((byte1 & 0x1F) << 6) | byte2;
        if (codePoint >= 0x80) {
            return codePoint;
        } else {
            throw Error('Invalid continuation byte');
        }
    }

    // 3-byte sequence (may include unpaired surrogates)
    if ((byte1 & 0xF0) == 0xE0) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
        if (codePoint >= 0x0800) {
            checkScalarValue(codePoint);
            return codePoint;
        } else {
            throw Error('Invalid continuation byte');
        }
    }

    // 4-byte sequence
    if ((byte1 & 0xF8) == 0xF0) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        byte4 = readContinuationByte();
        codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
            (byte3 << 0x06) | byte4;
        if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
            return codePoint;
        }
    }

    throw Error('Invalid UTF-8 detected');
}

var byteArray;
var byteCount;
var byteIndex;
function utf8decode(byteString) {
    byteArray = ucs2decode(byteString);
    byteCount = byteArray.length;
    byteIndex = 0;
    var codePoints = [];
    var tmp;
    while ((tmp = decodeSymbol()) !== false) {
        codePoints.push(tmp);
    }
    return ucs2encode(codePoints);
}
