import React from 'react';
import moment from 'moment-timezone';

const TimeZone = time => {
  const formattedDate = moment
    .tz(time, moment.tz.guess())
    .format('D MMMM YYYY h:mm A z');
  return formattedDate;
};

export default TimeZone;
