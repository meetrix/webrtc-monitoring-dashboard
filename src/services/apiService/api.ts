import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config';
import { getToken } from '../../utils/localStorageUtils';

export type Domain = string;

// Refer to: https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseURL,
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${getToken()}`);
    return headers;
  },
});

// Refer to : https://redux-toolkit.js.org/rtk-query/usage/streaming-updates
// and: https://wanago.io/2021/12/27/redux-toolkit-query-typescript/
export const api = createApi({
  baseQuery,
  endpoints: (build) => ({}),
});
