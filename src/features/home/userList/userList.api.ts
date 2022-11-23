/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getAllUsersApi = (data: any) => {
  const { roomId, pageSize, page } = data;
  return api.get(
    `report/participant?limit=10&offset=0&sortBy=created&direction=desc&direction=ASC&roomId=${roomId}&offset=${
      page * pageSize
    }&limit=${pageSize}`
  );
};

export const getUserErrorsApi = (data: any) => {
  const { userId, pageSize, page = 0 } = data;
  return api.get(
    `report/summary?participantId=${userId}&sortBy=timestamp&direction=desc&offset=${
      page * pageSize
    }&limit=${pageSize}`
  );
};
