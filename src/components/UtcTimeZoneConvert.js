import moment from 'moment-timezone';

const UtcTimeZoneConvert = zone => {
  const deviceTimezone = moment.tz.guess(zone);
  const nowInDeviceTimezone = moment.tz(deviceTimezone);
  const timezoneAbbreviation = nowInDeviceTimezone.format('z');
  return timezoneAbbreviation;
};

export default UtcTimeZoneConvert;
