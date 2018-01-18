import moment from 'moment';

const CURRENCY_ROUND = {
  'krw': 0,
  'usd': 2,
  'icx': 4
};
const today = new Date();

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

export function dateToUTC9(date, showUTC9) {
    return moment(date).utcOffset(9).format(`YYYY-MM-DD HH:mm:ss${!!showUTC9 ? ' [(UTC+9)]' : ''}`)
}

export function calcMaxPageNum(total, rowNum) {
    if(!Number(total)) return 1;
    return Math.ceil(total / rowNum);
}

export function calcTime(createDate){
  const todayMiliSeconds = today.getTime();
  const createDateMiliSeconds = new Date(createDate).getTime();
  const pastTimeHour = (todayMiliSeconds - createDateMiliSeconds) / (1000 * 3600);
  if(pastTimeHour >= 24){
    if(Math.round(pastTimeHour / 24) === 1){
      return "1 Day ago";
    }else{
      return `${Math.round(pastTimeHour/24)} Days ago`;
    }
  }else{
    if(Math.round(pastTimeHour) === 1){
      return "1 Hour ago";
    }else{
      return `${Math.round(pastTimeHour)} Hours ago`;
    }
  }
}