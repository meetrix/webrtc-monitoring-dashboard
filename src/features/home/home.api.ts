/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import api from '../../app/axios';

export const getMeetingsApi = (date: any) => {
  const { startDate, endDate } = date;
  return api.get(
    `report/room?sortBy=created&startTime=${startDate}&endTime=${endDate}`
  );
};
