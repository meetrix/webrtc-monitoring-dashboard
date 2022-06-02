/* eslint-disable import/prefer-default-export */

import config from '../config';

const webBaseUrl = config.api.baseURL;
export const generateMeetingUrl = (location: string, withBaseUrl = true) => {
  if (withBaseUrl) return `${webBaseUrl}/room/${location}`;

  return `/room/${location}`;
};
