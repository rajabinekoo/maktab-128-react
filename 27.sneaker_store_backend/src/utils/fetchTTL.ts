import * as moment from 'moment';

export const fetchTtl = () => {
  const now = moment();
  now.add(30, 'minutes');
  return now.unix();
};
