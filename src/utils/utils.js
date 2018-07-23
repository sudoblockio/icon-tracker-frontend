import React from 'react';
import moment from 'moment';
import { localDevUrl } from '../redux/api/restV3/config'
import {
  TokenLink,
} from '../components'
import {
  REDUX_STEP
} from './const'

// const CURRENCY_ROUND = {
//   'krw': 0,
//   'usd': 2,
//   'icx': 4
// };

export function numberWithCommas(x) {
  if (!x) { return 0 }
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function convertNumberToText(num, unit, round) {
  // let roundNum = CURRENCY_ROUND[unit];
  // if (num === "-" || Number(num) === 0) {
  //   return '0'
  // }
  // return numberWithCommas(Number(num).toFixed(roundNum).toString())
  if (!num || num === "-") return 0
  if (round) {
    return numberWithCommas(Number(num).toFixed(round))
  }
  else {
    return numberWithCommas(num)
  }
}

// export function isInt(value) {
//   return !isNaN(value) &&
//          parseInt(Number(value), 10) === value &&
//          !isNaN(parseInt(value, 10));
// }

// export function dateToUTC(date, showUTC) {
//   const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
//   return moment(date).utcOffset(timezoneOffset).format(`YYYY-MM-DD HH:mm:ss${!!showUTC ? ` [(UTC+${timezoneOffset})]` : ''}`)
// }

export function onlyDate(date) {
  if (!date) return '-'
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
  // const createMoment = moment(createDate)
  // const todayMoment = moment()
  // const diffDay = todayMoment.diff(createMoment, 'day')
  // const diffHour = todayMoment.diff(createMoment, 'hour')

  // if (diffDay === 0) {
  //   return diffHour > 1 ? `${diffHour} Hours ago` : `${diffHour} Hour ago`
  // }
  // else {
  //   return diffDay > 1 ? `${diffDay} Days ago` : `${diffDay} Day ago`
  // }
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

export function makeDownloadLink(address) {
  return `${localDevUrl}/score/${address}_1.zip`
}

export function tokenText(name, symbol, address) {
  const isSymbol = isVaildData(symbol)
  if (!isSymbol) {
    return "-"
  }
  const text = `${name || "-"} (${symbol})`
  if (!address) {
    return text
  }
  else {
    return <TokenLink label={text} to={address} />
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
          page: Number(action.payload.page) || 1,
          count: Number(action.payload.count) || state[dataType].count,
          error: ''
        }
      }
    case REDUX_STEP.FULFILLED:
      const { payload } = action
      const { data } = payload
      const _data =
        dataType === 'walletTx' ? data['walletTx'] :
          dataType === 'walletTokenTx' ? data['tokenTx'] :
            dataType === 'blockTx' ? data['txInBlock'] :
              dataType === 'tokens' ? data['tokenInfoList'] :
                data
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: false,
          data: _data || [],
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
          error: ''
        }
      }
    case REDUX_STEP.FULFILLED:
      const { payload } = action
      const { data } = payload
      const _data =
        dataType === 'wallet' ? data['walletDetail'] :
          dataType === 'block' ? data['blockDetail'] :
            dataType === 'contractAbi' ? data['result'] :
              data
      return {
        ...state,
        [dataType]: {
          ...state[dataType],
          loading: false,
          data: _data || {},
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

export function isVaildData(data) {
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