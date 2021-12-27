import { AxiosInstance } from 'axios';
import { AxiosOptions, AxiosWrapper } from './axiosWrapper';

let api: AxiosInstance;

export const initializeAPI = ({
  baseURL,
  token,
}: AxiosOptions): AxiosInstance => {
  api = new AxiosWrapper({ baseURL, token }).getApi();
  return api;
};

export const getAPI = (): AxiosInstance => {
  if (!api) {
    throw new Error('Api is not initialized');
  }
  return api;
};

export const setAPI = (_api: AxiosInstance): void => {
  api = _api;
};
