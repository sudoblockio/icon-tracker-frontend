import React from 'react'
import moment from 'moment'
import { getTrackerApiUrl } from '../redux/api/restV3/config'
import { getLastBlock } from '../../src/redux/api/restV3/iiss'
import BigNumber from 'bignumber.js'
import { IconConverter, IconAmount } from 'icon-sdk-js'
import { TokenLink } from '../components'
import { REDUX_STEP, SERVER_TX_TYPE } from './const'
import { getIsSoloVersion } from '../redux/api/restV3/config'

moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '%d seconds',
        ss: '%d seconds',
        m: '%d minute',
        mm: '%d minutes',
        h: '%d hour',
        hh: '%d hours',
        d: '%d day',
        dd: '%d days',
        M: '%d month',
        MM: '%d months', 
        y: '%d year',
        yy: '%d years',
    },
})

export function getTextFromHtml(data) {
    if (!data || typeof data !== 'string') return ''

    return data.replace(/(<([^>]+)>)/ig,"");
}

export function numberWithCommas(x) {
    if (!x) {
        return 0
    }
    let parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (parts[1]) {
        parts[1] = parts[1].replace(/0+$/, "")
    }
    if (parts[1] === "") {
        parts.pop()
    }
    return parts.join('.')
}

export function convertNumberToText(num, round) {
    if (!isValidData(num)) {
        return 0
    }

    if (typeof num === 'string') {
        num = num.replace(/,/g, '')
    }

    let numStr
    if (round >= 0) {
        numStr = new BigNumber(num).toFixed(round)
    } else {
        numStr = new BigNumber(num).toString(10)
    }

    return numberWithCommas(numStr)
}

export function convertToExponentialText(num, round) {
    if (!isValidData(num)) {
        return 0
    }

    if (typeof num === 'string') {
        num = num.replace(/,/g, '')
    }

    num = Number(num)
    num = String(num.toExponential(round))
    const mantissa = num.substr(0, num.lastIndexOf('e'))
    const exponent = num.substr(num.lastIndexOf('e') + 2)

    return `${mantissa} * 10 ^ ${exponent}`
}

export function onlyDate(date) {
    if (!isValidData(date)) return '-'
    const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
    return moment(date)
        .utcOffset(timezoneOffset)
        .format('YYYY-MM-DD')
}

export function getTimezoneMomentTime(date) {
    const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
    return moment(date)
        .utcOffset(timezoneOffset)
        .format('YYYY-MM-DD HH:mm:ss')
}

export function getTimezoneMomentKSTTime(date) {
    
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export function dateToUTC(date, showUTC, showAgo) {
    if (!date) return '-'
    const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
    let result = moment(date)
        .utcOffset(timezoneOffset)
        .format('YYYY-MM-DD HH:mm:ss')
    if (showUTC) {
        result += ` (${getUTCString()})`
    }
    if (showAgo) {
        result += `(${getUTCString()}, ${calcFromNow(date)})`
    }
    return result
}

export function utcDateInfo(date) {
    return `(${getUTCString()}, ${calcFromNow(date)})`
}

export function calcMaxPageNum(total, rowNum) {
    if (!Number(total)) return 1
    return Math.ceil(total / rowNum)
}

export function makeFromNowText(fistTime, firstText, secondTime, secondText, later) {
    const _secondTime = secondTime === 0 ? undefined : secondTime
    const result = [
        fistTime && `${fistTime} ${firstText}${fistTime === 1 ? "" : "s"}`,
        _secondTime && `${_secondTime} ${secondText}${_secondTime === 1 ? "" : "s"}`,
    ]

    if (later) {
        result.unshift('in')
    }
    else {
        result.push('ago')
    }

    return result.join(" ")
}



export function calcFromNow(createDate) {
    const M = 60
    const H = M * 60
    const D = H * 24
    const W = D * 7

    const createMoment = moment(createDate)
    const currentMoment = moment()
    const createTime = createMoment.format('X')
    const currentTime = currentMoment.format('X')
    const diffValue = currentTime - createTime
    const diff = Math.abs(diffValue)
    const later = diffValue < 0

    if (diff === 0) {
        return 'right now'
    }
    else if (diff > 0 && diff < M) {
        console.log("1")
        return makeFromNowText(diff, 'second', undefined, '', later)
    }
    else if (diff >= M && diff < H) {
        console.log("2")
        const minute = Math.floor(diff / M)
        const second = diff % M
        return makeFromNowText(minute, 'minute', second, 'second', later)
    }
    else if (diff >= H && diff < D) {
        console.log("3")
        const hour = Math.floor(diff / H)
        const minute = Math.floor((diff % H) / M)
        return makeFromNowText(hour, 'hour', minute, 'minute', later)
    }
    else if (diff >= D && diff < W) {
        console.log("4")
        const day = Math.floor(diff / D)
        const hour = Math.floor((diff % D) / H)
        return makeFromNowText(day, 'day', hour, 'hour', later)
    }
    else {
        console.log("5")
        const week = Math.floor(diff / W)
        const day = Math.floor((diff % W) / D)
        return makeFromNowText(week, 'week', day, 'day', later)
    }
}

export function calcFromLastBlock(blockDiff) {
    const M = 60
    const H = M * 60
    const D = H * 24
    const W = D * 7

    const diff = blockDiff * 2
    if (diff === 0) {
        return 'right now'
    }
    else if (diff > 0 && diff < M) {
        return makeFromNowText(diff, 'second')
    }
    else if (diff > M && diff < H) {
        const minute = Math.floor(diff / M)
        return makeFromNowText(minute, 'minute')
    }
    else if (diff >= H && diff < D) {
        const hour = Math.floor(diff / H)
        return makeFromNowText(hour, 'hour')
    }
    else if (diff >= D && diff < W) {
        const day = Math.floor(diff / D)
        return makeFromNowText(day, 'day')
    }
    else {
        const week = Math.floor(diff / W)
        return makeFromNowText(week, 'week')
    }
}

export function getUTCString() {
    let timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
    if (timezoneOffset > 0) {
        timezoneOffset = `+${timezoneOffset}`
    }
    return `UTC${timezoneOffset === 0 ? '' : `${timezoneOffset}`}`
}

export function isValidNodeType(nodeType) {
    if (!nodeType) return false
    if (nodeType === '') return false
    if (nodeType === '-') return false
    return true
}

export function startsWith(text, search) {
    if (typeof text !== 'string') return false
    return text.indexOf(search) === 0
}

export function isContractAddress(address) {
    return startsWith(address, 'cx')
}

export function makeUrl(url, payload) {
    if (!payload) {
        return url
    }
    let result = url
    Object.keys(payload).forEach((key, index) => {
        result += `${index === 0 ? '?' : '&'}${key}=${payload[key]}`
    })
    return "/api" + result
}

export function randomUint32() {
    if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
        var o = new Uint32Array(1)
        window.crypto.getRandomValues(o)
        return o[0]
    } else {
        console.warn('Falling back to pseudo-random client seed')
        return Math.floor(Math.random() * Math.pow(2, 32))
    }
}

export async function makeDownloadLink(address, version) {
    const apiUrl = await getTrackerApiUrl()
    return `${apiUrl}/score/${address}_${version}.zip`
}

export function tokenText(name, symbol, address, spanClassName) {
    const isName = isValidData(name)
    const isSymbol = isValidData(symbol)

    let text = ''
    if (isName) {
        text += name
        if (isSymbol) {
            text += ` (${symbol})`
        }
    } else {
        if (isSymbol) {
            text += symbol
        } else {
            text += '-'
        }
    }

    if (!address) {
        return text
    } else {
        return <TokenLink to={address} label={!spanClassName ? text : <span className={spanClassName}>{text}</span>} />
    }
}

export function getArrayState(step, state, action, dataType) {
    const { payload } = action
    switch (step) {
        case REDUX_STEP.READY:
            const { page, count } = payload
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: true,
                    page: Number(page) || state[dataType].page,
                    count: Number(count) || state[dataType].count,
                    error: '',
                },
            }
        case REDUX_STEP.FULFILLED:
            const { data, listSize, totalSize } = payload
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: false,
                    data: data || [],
                    listSize: listSize || 0,
                    totalSize: totalSize || 0,
                    error: '',
                },
            }
        case REDUX_STEP.REJECTED:
            const { error } = action
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: false,
                    data: [],
                    error: error,
                },
            }
        case REDUX_STEP.INIT:
            return {
                ...state,
                [dataType]: {
                    loading: false,
                    page: 1,
                    count: 25,
                    data: [],
                    listSize: 0,
                    totalSize: 0,
                    error: '',
                },
            }
        default:
            return state
    }
}

export function getObjectState(step, state, action, dataType) {
    switch (step) {
        case REDUX_STEP.READY:
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: true,
                    data: {},
                    error: '',
                },
            }
        case REDUX_STEP.FULFILLED:
            const { payload } = action
            const { data } = payload
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: false,
                    data: data || {},
                    error: '',
                },
            }
        case REDUX_STEP.REJECTED:
            const { error, pending } = action
            return {
                ...state,
                [dataType]: {
                    ...state[dataType],
                    loading: false,
                    data: {},
                    error: error,
                    pending: pending,
                },
            }
        case REDUX_STEP.INIT:
            return {
                ...state,
                [dataType]: {
                    loading: false,
                    data: {},
                    error: '',
                },
            }
        default:
            return state
    }
}

export function getState(type, step, state, action, dataType) {
    switch (type) {
        case 'ARR':
            return getArrayState(step, state, action, dataType)
        case 'OBJ':
            return getObjectState(step, state, action, dataType)
        default:
            return state
    }
}

export function isValidData(data) {
    if (!!data && data !== '-') return true
    else return false
}

export function searchLowerCase(searchValue, searchItems) {
    if (!searchValue) return true

    const lowerSearch = searchValue.toLowerCase()
    let result = false
    for (let i = 0; i < searchItems.length; i++) {
        if (!searchItems[i]) continue
        result = searchItems[i].toLowerCase().indexOf(lowerSearch) !== -1
        if (result) break
    }
    return result
}

export function findTabIndex(Tabs, hash) {
    for (let i = 0; i < Tabs.length; i++) {
        const _tab = noSpaceLowerCase(Tabs[i])
        const _hash = noHashLowerCase(hash)
        if (_tab === _hash) {
            return i
        } else {
            continue
        }
    }
    return -1
}

export function noSpaceLowerCase(str) {
    if (!str) return ''
    return str.replace(/\s/gi, '').toLowerCase()
}

export function noHashLowerCase(str) {
    if (!str) return ''
    return str.replace('#', '').toLowerCase()
}

export function isHxAddress(str) {
    return /^(hx)[0-9a-f]{40}$/i.test(str)
}

export function isCxAddress(str) {
    return /^(cx)[0-9a-f]{40}$/i.test(str)
}

export function is0xHash(str) {
    return /^(0x)[0-9a-f]{64}$/i.test(str)
}

export function isHash(str) {
    return /^[0-9a-f]{64}$/i.test(str)
}

export function isNumeric(str) {
    return /^\d+$/.test(str)
}

export function isScoreTx(targetAddr, txType, isFrom) {
    if (isFrom) {
        return false
    }
    const _txType = SERVER_TX_TYPE[txType]
    // switch (_txType) {
    //   case SERVER_TX_TYPE[3]:
    //   case SERVER_TX_TYPE[4]:
    //     return targetAddr === "cx0000000000000000000000000000000000000000"
    //   case SERVER_TX_TYPE[5]:
    //   case SERVER_TX_TYPE[6]:
    //   case SERVER_TX_TYPE[7]:
    //   case SERVER_TX_TYPE[8]:
    //     return targetAddr === "cx0000000000000000000000000000000000000001"
    //   case SERVER_TX_TYPE[9]:
    //     return targetAddr === "cx0000000000000000000000000000000000000000"
    //   default:
    //     return false
    // }
    switch (_txType) {
        case SERVER_TX_TYPE[3]:
        case SERVER_TX_TYPE[4]:
        case SERVER_TX_TYPE[5]:
        case SERVER_TX_TYPE[6]:
        case SERVER_TX_TYPE[7]:
        case SERVER_TX_TYPE[8]:
            return true
        case SERVER_TX_TYPE[9]:
            return targetAddr !== 'cx0000000000000000000000000000000000000001'
        default:
            return false
    }
}

export function beautifyJson(data, tab) {
    if (!data) {
        return ''
    }
    try {
        let _data = {}
        if (typeof data === 'object') {
            _data = data
        } else if (typeof data === 'string') {
            _data = JSON.parse(data)
        }
        return JSON.stringify(_data, null, tab)
    } catch (e) {
        console.log(e)
        return ''
    }
}

export function removeQuotes(str) {
    if (!str) {
        return ''
    }

    if (str[0] === '"') {
        str = str.substr(1)
    }

    if (str[str.length - 1] === '"') {
        str = str.substr(0, str.length - 1)
    }

    return str
}

export async function getIsSolo() {
    const result = await getIsSoloVersion()
    return result
}

export function isHex(value) {
    return /^(0x)[0-9a-fA-F]+$/i.test(value)
}

export function isImageData(data) {
    if (typeof data === 'string') {
        return data.indexOf('data:image') === 0
    }

    return false
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function convertEngineToTracker(resultData, byHashData) {
    if (!resultData || !byHashData) {
        return undefined
    }

    const valueIcx = IconAmount.of(byHashData.value, IconAmount.Unit.LOOP)
        .convertUnit(IconAmount.Unit.ICX)
        .toString()
    const stepUsed = IconAmount.of(resultData.stepUsed)
    const stepPrice = IconAmount.of(resultData.stepPrice).toString()
    const { eventLogs, stepUsedDetails } = resultData
    const { txHash, from, blockHeight: height } = byHashData
    const result = {
        txHash,
        status: resultData.status === 1 ? 'Success' : 'Fail',
        height,
        confirmation: '',
        createDate: moment(byHashData.timestamp / 1000).format(),
        fromAddr: from,
        toAddr: byHashData.to,
        amount: valueIcx === 'NaN' ? 0 : valueIcx,
        stepLimit: IconAmount.of(byHashData.stepLimit).toString(),
        stepUsedByTxn: stepUsed.toString(),
        stepUsedDetails,
        stepPrice,
        fee: IconAmount.of(IconConverter.toBigNumber(stepUsed.value).multipliedBy(stepPrice), IconAmount.Unit.LOOP)
            .convertUnit(IconAmount.Unit.ICX)
            .toString(),
        dataType: byHashData.dataType,
        dataString: byHashData.data,
        tokenTxList: [],
        internalTxList: [],
    }

    if (eventLogs.length === 0) {
        return result
    }

    eventLogs.forEach((eventLog, index) => {
        const { indexed, scoreAddress } = eventLog
        if (indexed[0] === 'Transfer(Address,Address,int,bytes)') {
            result.tokenTxList.push({
                fromAddr: indexed[1],
                toAddr: indexed[2],
                quantity: IconAmount.of(indexed[3], IconAmount.Unit.LOOP)
                    .convertUnit(IconAmount.Unit.ICX)
                    .toString(),
                targetContractAddr: scoreAddress,
                symbol: 'TOKENS',
                tokenName: ' - ',
            })
        }

        if (indexed[0] === 'ICXTransfer(Address,Address,int)') {
            result.internalTxList.push({
                amount: IconAmount.of(indexed[3], IconAmount.Unit.LOOP)
                    .convertUnit(IconAmount.Unit.ICX)
                    .toString(),
                contractAddr: scoreAddress,
                fromAddr: indexed[1],
                height: height,
                toAddr: indexed[2],
                txHash,
                txIndex: index,
            })
        }
    })

    return result
}

export function convertLoopToIcxDecimal(loop) {
    return IconAmount.of(loop, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString()
}

export function getBadgeTitle(grade, status) {
    switch (status) {
        case 1:
        case '0x1':
            return 'Unregistered'
        case 2:
        case '0x2':
            return 'Disqualified'
        default:
    }

    switch (grade) {
        case 0:
        case '0x0':
            return 'Main P-Rep'
        case 1:
        case '0x1':
            return 'Sub P-Rep'
        case 2:
        case '0x2':
            return 'Candidate'
        default:
            return 'Unregistered'
    }
}

export function addUnregisteredStyle(status, grade) {
    const _status = Number(status)
    const _grade = Number(grade)
    if (!isNaN(_status) && (_status > 0 && _status < 3)) {
        return " prep-unregistered"
    }
    else if (isNaN(_grade) || (_grade > 2)) {
        return " prep-unregistered"
    }
    else {
        return ""
    }
}

export function valueToString(value) {
    if (!value) return ''

    if (typeof value === 'string') {
        return value
    }

    let result = ''
    if (typeof value === 'object') {
        Object.keys(value).forEach(key => {
            result += (result !== '' ? ', ' : '') + value[key]
        })
    }

    return result
}

export function isUrl(text) {
    const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    return regexp.test(text)
}

export function addAt(text) {
    if (startsWith(text, '@') || isUrl(text)) {
        return text
    }
    else {
        return '@' + text
    }
}

export function closeEm(text) {
    if (!text) return ''
    return text.replace(/<\/em>/gi, "</em").replace(/<\/em/gi, "</em>")
}

export const convertHexToValue = (hex) => {
    let value;
    if (hex === "0x0") {
        value = 0
    } else {
        const bigNum = BigNumber(hex, 16)
        const divisor = Math.pow(10, 18)
        value = BigNumber(bigNum / divisor).toPrecision();
    }

    return Number(value);
}

export const epochToFromNow = (date) => {
    let parsed = parseInt(date, 16)
    let prettyDate;
    typeof(date) === "string" ?  prettyDate =  moment(new Date(parsed / 1000)).fromNow() : prettyDate = moment(new Date(date / 1000)).fromNow();
    return prettyDate
}

export const getConfirmations = async (block_number) => {
    const lastBlock = await getLastBlock()
    return Number(lastBlock - block_number)
}