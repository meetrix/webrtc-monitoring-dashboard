import axios, { AxiosInstance } from 'axios';

export interface AxiosOptions {
  baseURL: string;
  token?: string;
}

export class AxiosWrapper {
  api: AxiosInstance;

  constructor({ baseURL, token }: AxiosOptions) {
    this.api = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error || !error.response) {
          const er = {
            ...error,
            response: {
              ...error.response,
              data: {
                success: false,
                data: null,
                message: 'Something went wrong. Please try again later.',
              },
            },
          };
          return Promise.reject(er);
        }
        if (error.response.status === 401) {
          if (typeof error.response.data !== 'object') {
            const er = {
              ...error,
              response: {
                ...error.response,
                data: {
                  success: false,
                  data: null,
                  message: 'User unauthorized',
                },
              },
            };
            return Promise.reject(er);
          }
        } else if (error.response.status === 404) {
          if (typeof error.response.data !== 'object') {
            const er = {
              ...error,
              response: {
                ...error.response,
                data: {
                  success: false,
                  data: null,
                  message: 'Something went wrong. Please try again later.',
                },
              },
            };

            return Promise.reject(er);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string): void {
    this.api.interceptors.request.use((config) => {
      if (config?.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
      }
      return config;
    });
  }

  getApi(): AxiosInstance {
    return this.api;
  }
}
