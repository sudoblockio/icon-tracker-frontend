export const NETWORK_NAME = {
    'tracker.icon.foundation': 'Mainnet',
    'trackerdev.icon.foundation': 'Euljiro',
    'bicon.tracker.solidwallet.io': 'Yeouido'
}

const DEPLOY_TX_TYPE = {
    "3": "Contract created",
    "4": "Contract updated",
    "5": "Contract accepted",
    "6": "Contract rejected",
    "7": "Update accepted",
    "8": "Update rejected",
    "9": "Update cancelled"
}

// console.log('sw.js')

// self.addEventListener('install', event => {
//     console.log('install', event)
// });

// self.addEventListener('activate', event => {
//     console.log('activate', event)
// });

self.addEventListener('notificationclick', async event => {
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
    const data = JSON.parse(event.data.text())
    const { timestamp } = data
    const eventTime = new Date(timestamp).getTime()
    const currentTime = new Date().getTime()
    const diffMinute = (currentTime - eventTime) / (1000 * 60)
    if (diffMinute > 10) {
        return
    }

    const { currentTarget } = event
    let { origin } = currentTarget
    const host = origin.replace('https://', '')
    if (!NETWORK_NAME[host]) {
        origin = 'https://tracker.icon.foundation'
    }

    const { navigator } = currentTarget
    const { platform } = navigator
    const { address, txHash } = data
    const { title, image } = await makeData(origin, address, txHash)
    const icon = image ? image : platform === 'Win32' ? './logo.png' : undefined
    const options = { data: txHash, icon };
    setTimeout(() => {
        self.registration.showNotification(title, options)
    }, 100);
});

async function makeData(origin, address, txHash) {
    const txDetail = await getTxDetail(origin, txHash)
    const { fromAddr, dataType } = txDetail
    const isWithdraw = fromAddr === address
    switch (dataType) {
        case 'icx': {
            const { amount } = txDetail
            const operation = isWithdraw ? 'Withdraw' : 'Deposit'
            return { title: `${operation} ${amount} ICX` }
        }
        case 'message': {
            const { isSafe, dataString } = txDetail
            const removed = dataString.replace(/\"/gi, "");
            const decoded = toUtf8(removed)
            const isImage = isSafe && decoded.indexOf('data:image') === 0
            return isWithdraw ? {
                title: 'Message transaction sent'
            } : {
                    title: isImage ? 'Image' : decoded,
                    image: isImage ? decoded : undefined
                }
        }
        case 'call': {
            const { tokenTxList } = txDetail
            const { length } = tokenTxList
            if (length === 0) {
                const { dataString, targetContractAddr } = txDetail
                const parsed = JSON.parse(dataString)
                const { method } = parsed
                return { title: `${method} called on ${targetContractAddr}` }
            }
            else {
                const filtered = tokenTxList.filter(tx => tx.fromAddr === address || tx.toAddr === address)
                const tokenTx = filtered[0]
                const { quantity, fromAddr: tokenFromAddr, symbol } = tokenTx
                const operation = (tokenFromAddr === address) ? 'Withdraw' : 'Deposit'
                return { title: `${operation} ${quantity} ${symbol}${length > 1 ? ` (${length})` : ''}` }
            }
        }
        case 'deploy': {
            const { txType } = txDetail
            return { title: DEPLOY_TX_TYPE[txType] }
        }
        default: {
            return { title: 'Notification' }
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
