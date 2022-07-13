/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import api from '../../app/axios';

// eslint-disable-next-line import/prefer-default-export
export const troubleshooterGetSummaryApi = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  return api.get(
    `troubleshooter/summary?startTime=${startTime}&endTime=${endTime}`
  );
};
