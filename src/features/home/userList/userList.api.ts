/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getAllUsersApi = (data: any) => {
  const { roomId, pageSize } = data;
  return api.get(
    `report/participant?limit=10&offset=0&sortBy=created&direction=ASC&roomId=${roomId}&offset=0&limit=${pageSize}`
  );
};

export const getUserErrorsApi = (data: any) => {
  const { userId, pageSize } = data;
  return api.get(
    `report/summary?participantId=${userId}&sortBy=timestamp&offset=0&limit=${pageSize}`
  );
};
