/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import api from '../../app/axios';

// eslint-disable-next-line import/prefer-default-export
export const troubleshooterDetailsGetAllApi = ({
  limit,
  offset,
  sortBy,
  direction,
  startTime,
  endTime,
  testId,
}: {
  limit: number;
  offset: number;
  sortBy: string;
  direction: number;
  startTime: string;
  endTime: string;
  testId: string;
}) => {
  return api.get(
    `troubleshooter?limit=${limit}&offset=${offset}&sortBy=${sortBy}&direction=${direction}&startTime=${startTime}&endTime=${endTime}&testId=${testId}`
  );
};
