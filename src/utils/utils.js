import moment from 'moment';

const CURRENCY_ROUND = {
  'krw': 0,
  'usd': 2,
  'icx': 4
};

export function numberWithCommas(x) {
  if (!x) { x = 0 }
	let parts = x.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
}

export function convertNumberToText(num, unit) {
  let roundNum = CURRENCY_ROUND[unit];
  if (num === "-" || Number(num) === 0) {
    return '0'
  }
  return numberWithCommas(Number(num).toFixed(roundNum).toString())
}

export function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

export function dateToUTC9(date) {
    return moment(date).utcOffset(9).format('YYYY-MM-DD HH:mm:ss [(UTC+9)]')
}
