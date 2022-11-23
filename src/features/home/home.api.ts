/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import api from '../../app/axios';

export const getMeetingsApi = (date: any) => {
  const { startDate, endDate, page, pageSize } = date;
  return api.get(
    `report/room?sortBy=created&startTime=${startDate}:00:00:00&endTime=${endDate}:23:59:59&offset=${
      page * pageSize
    }&limit=${pageSize}`
  );
};
