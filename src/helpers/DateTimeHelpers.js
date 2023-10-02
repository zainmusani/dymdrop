import moment, {duration} from 'moment';

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const ISOToFormat = (DateTime, format) => {
  if (moment(DateTime).format(format) === 'Invalid date') {
    return null;
  } else {
    return moment(DateTime).format(format);
  }
};

export {GetCurrentTimeInISO, ISOToFormat};
