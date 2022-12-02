const API_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? window._env_.REACT_APP_API_BASE_URL
    : process.env.REACT_APP_API_BASE_URL || 'http://localhost:9100';

const API_BASE_URL_V1 =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? `${window._env_.REACT_APP_API_BASE_URL}/v1`
    : (process.env.REACT_APP_API_BASE_URL &&
        `${process.env.REACT_APP_API_BASE_URL}/v1`) ||
      'http://localhost:9100/v1';

const SOCKET_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? window._env_.REACT_APP_SOCKET_BASE_URL
    : process.env.REACT_APP_SOCKET_BASE_URL || 'http://localhost:9100/users';

const PUBLIC_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? window._env_.PUBLIC_URL
    : process.env.PUBLIC_URL;
export default {
  api: {
    baseURL: API_BASE_URL,
    baseURLv1: API_BASE_URL_V1,
  },
  socket: {
    url: SOCKET_BASE_URL,
    options: {
      path: '/stats',
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbHVnaW4iOnRydWUsImRvbWFpbiI6Im1lZXRyaXguaW8iLCJpYXQiOjE2NDA0OTQwMTAsImV4cCI6MTcyNjg5NDAxMCwic3ViIjoiNjFjNmYyNjZjNzU5MjAzMGRiYzViN2EwIn0.lF8zZMj--pOLslgpbP0LjC4FVotEOPQW-rN_2kucJCM',
      },
    },
  },
  publicUrl: PUBLIC_URL,
};
