/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getAllUsersApi = () => {
  return api.get(
    'report/participant?limit=10&offset=0&sortBy=created&direction=ASC&roomid=636dbe134a9b1e4f7a35458e'
  );
};

export const getUserErrorsApi = (participantId: string) => {
  return api.get(
    `report/summary?participantId=${participantId}&sortBy=timestamp`
  );
};
