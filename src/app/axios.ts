import axios from 'axios';
import { getToken } from '../helper/localStorage';
import config from '../config';

const token = getToken();

const api = axios.create({
  baseURL: config.api.baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const setHeader = (accessToken: string) => {
  api.interceptors.request.use((config2) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config2!.headers!.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : '';
    return config2;
  });
};

export default api;
