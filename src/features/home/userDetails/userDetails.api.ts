/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getUserDetailsApi = () => {
  console.log('kkkk getMeetingsApi');
  return api.get(
    'report/summary?participantId=636dd461d68965322643415a&sortBy=timestamp'
  );
};
