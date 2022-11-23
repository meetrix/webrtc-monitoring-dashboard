/* eslint-disable import/prefer-default-export */
import api from '../../../app/axios';

export const getAllUsersApi = (data: any) => {
  const { roomId, pageSize, page } = data;
  return api.get(
    `report/participant?&sortBy=created&direction=desc&roomId=${roomId}&offset=${
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
