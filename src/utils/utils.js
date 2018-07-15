import moment from 'moment';

// const CURRENCY_ROUND = {
//   'krw': 0,
//   'usd': 2,
//   'icx': 4
// };

export function numberWithCommas(x) {
  if (!x) { x = 0 }
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

export function dateToUTC(date, showUTC, showAgo) {
  if (!date) return '-'

  const timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  let result = moment(date).utcOffset(timezoneOffset).format('YYYY-MM-DD HH:mm:ss')
  if (showUTC) {
    result += ` (${getUTCString()})`
  }
  if (showAgo) {
    result += `(${getUTCString()}, ${calcTime(date)})`
  }
  return result
}

export function utcDateInfo(date) {
  return `(${getUTCString()}, ${calcTime(date)})`
}


export function calcMaxPageNum(total, rowNum) {
  if(!Number(total)) return 1;
  return Math.ceil(total / rowNum);
}

export function calcTime(createDate){
  const createMoment = moment(createDate)
  const todayMoment = moment()
  const diffDay = todayMoment.diff(createMoment, 'day')
  const diffHour = todayMoment.diff(createMoment, 'hour')

  if (diffDay === 0) {
    return diffHour > 1 ? `${diffHour} Hours ago` : `${diffHour} Hour ago`
  }
  else {
    return diffDay > 1 ? `${diffDay} Days ago` : `${diffDay} Day ago`
  }
}

export function getUTCString() {
  let timezoneOffset = (new Date().getTimezoneOffset() / 60) * -1
  if (timezoneOffset > 0) {timezoneOffset = `+${timezoneOffset}`}
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