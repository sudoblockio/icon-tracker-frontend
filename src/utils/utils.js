import React from 'react';
import moment from 'moment';
import { apiUrl } from '../redux/api/restV3/config'
import BigNumber from 'bignumber.js'
import {
  TokenLink,
} from 'components'
import {
  REDUX_STEP, 
  SERVER_TX_TYPE
} from './const'

moment.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: '%d seconds',
    ss: '%d seconds',
    m: "%d minute",
    mm: "%d minutes",
    h: "%d hour",
    hh: "%d hours",
    d: "%d day",
    dd: "%d days",
    M: "%d month",
    MM: "%d months",
    y: "%d year",
    yy: "%d years"
  }
});

export function numberWithCommas(x) {
  if (!x) { return 0 }
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function convertNumberToText(num, round) {
  if (!isValidData(num)) {
    return 0
  }

  if (typeof num === 'string') {
    num = num.replace(/,/g, "");
  }

  let numStr
  if (round >= 0) {
    numStr = (new BigNumber(num)).toFixed(round)
  }
  else {
    numStr = (new BigNumber(num)).toString(10)
  }

  return numberWithCommas(numStr)
}

export function onlyDate(date) {
  if (!isValidData(date)) return "-"
  const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  return moment(date).utcOffset(timezoneOffset).format('YYYY-MM-DD')
}

export function getTimezoneMomentTime(date) {
  const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  return moment(date).utcOffset(timezoneOffset).format('YYYY-MM-DD HH:mm:ss')
}

export function dateToUTC(date, showUTC, showAgo) {
  if (!date) return '-'
  const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  let result = moment(date).utcOffset(timezoneOffset).format('YYYY-MM-DD HH:mm:ss')
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
  if (!Number(total)) return 1;
  return Math.ceil(total / rowNum);
}

export function calcFromNow(createDate) {
  return moment(createDate).fromNow()
}

export function getUTCString() {
  let timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  if (timezoneOffset > 0) { timezoneOffset = `+${timezoneOffset}` }
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
  return result
}

export function randomUint32() {
  if (window && window.crypto && window.crypto.getRandomValues && Uint32Array) {
    var o = new Uint32Array(1);
    window.crypto.getRandomValues(o);
    return o[0];
  } else {
    console.warn('Falling back to pseudo-random client seed');
    return Math.floor(Math.random() * Math.pow(2, 32));
  }
}

export function makeDownloadLink(address, version) {
  return `${apiUrl}/score/${address}_${version}.zip`
}

export function tokenText(name, symbol, address, spanClassName) {
  const isName = isValidData(name)
  const isSymbol = isValidData(symbol)

  let text = ""
  if (isName) {
    text += name
    if (isSymbol) {
      text += ` (${symbol})`
    }
  }
  else {
    if (isSymbol) {
      text += symbol
    }
    else {
      text += "-"
    }
  }

  if (!address) {
    return text
  }
  else {
    return <TokenLink to={address} label={!spanClassName ? text : <span className={spanClassName}>{text}</span>} />
  }
}

export function getArrayState(step, state, action, dataType) {
  switch (step) {
    case REDUX_STEP.READY:
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: true,
          data: [],
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state[dataType].count,
          listSize: 0,
          totalSize: 0,
          error: ''
        }
      }
    case REDUX_STEP.FULFILLED:
      const { payload } = action
      const { data } = payload
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: false,
          data: data || [],
          listSize: action.payload.listSize || 0,
          totalSize: action.payload.totalSize || 0,
          error: ''
        }
      }
    case REDUX_STEP.REJECTED:
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: false,
          error: action.error
        }
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
          error: ''
        }
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
          error: ''
        }
      }
    case REDUX_STEP.REJECTED:
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: false,
          error: action.error
        }
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
    }
    else {
      continue
    }
  }
  return -1
}

export function noSpaceLowerCase(str) {
  if (!str) return ''
  return str.replace(/\s/gi, "").toLowerCase()
}

export function noHashLowerCase(str) {
  if (!str) return ''
  return str.replace("#", "").toLowerCase()
}

export function isHxAddress(str) {
  if (!str) return false
  return startsWith(str, 'hx') && str.length === 42
}

export function isCxAddress(str) {
  if (!str) return false
  return startsWith(str, 'cx') && str.length === 42
}

export function is0xAddress(str) {
  if (!str) return false
  return startsWith(str, '0x') && str.length === 66
}

export function isScoreTx(targetAddr, txType, isFrom) {
  if (isFrom) {
    return false
  }
  const _txType = SERVER_TX_TYPE[txType]
  switch(_txType) {
    case SERVER_TX_TYPE[3]:
      return targetAddr === "cx0000000000000000000000000000000000000000"
    case SERVER_TX_TYPE[4]:
      return true
    case SERVER_TX_TYPE[5]:  
    case SERVER_TX_TYPE[6]:
      return targetAddr === "cx0000000000000000000000000000000000000001"
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
    }
    else if (typeof data === 'string') {
      _data = JSON.parse(data)
    }
    return JSON.stringify(_data, null, tab)
  }
  catch (e) {
    console.log(e)
    return ''
  }
}

export function removeQuotes(str) {
  return str.replace(/"/gi, "")
}