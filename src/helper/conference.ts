/* eslint-disable import/prefer-default-export */

import config from '../config';

const webBaseUrl = config.api.baseURLv1;
export const generateMeetingUrl = (location: string, withBaseUrl = true) => {
  if (withBaseUrl) return `${webBaseUrl}/room/${location}`;

  return `/room/${location}`;
};
