/* eslint-disable import/prefer-default-export */
import api from '../../app/axios';

export const getMeetingsApi = () => {
  return api.get('report/room?sortBy=created');
};
