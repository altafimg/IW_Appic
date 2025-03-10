import moment from 'moment-timezone';

const UtcTimeConvert = utcTime => {
  const utcMoment = moment.utc(utcTime);
  const localTime = utcMoment.local().format('HH:mm A');
  return localTime;
};

export default UtcTimeConvert;
