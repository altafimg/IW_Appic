import moment from 'moment-timezone';

const UtcDateConvert = utcTime => {
  const utcMoment = moment.utc(utcTime);
  const localTime = utcMoment.local().format('D MMM YYYY');
  return localTime;
};

export default UtcDateConvert;
