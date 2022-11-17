/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getAllUsersApi = (roomId: string) => {
  return api.get(
    `report/participant?limit=10&offset=0&sortBy=created&direction=ASC&roomid=${roomId}`
  );
};

export const getUserErrorsApi = (participantId: string) => {
  return api.get(
    `report/summary?participantId=${participantId}&sortBy=timestamp`
  );
};
