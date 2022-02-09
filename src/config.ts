export default {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:9100/v1',
  },
  socket: {
    url: process.env.REACT_APP_SOCKET_BASE_URL || 'http://localhost:9100',
    options: {
      path: '/stats',
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbHVnaW4iOnRydWUsImRvbWFpbiI6Im1lZXRyaXguaW8iLCJpYXQiOjE2NDA0OTQwMTAsImV4cCI6MTcyNjg5NDAxMCwic3ViIjoiNjFjNmYyNjZjNzU5MjAzMGRiYzViN2EwIn0.lF8zZMj--pOLslgpbP0LjC4FVotEOPQW-rN_2kucJCM',
      },
    },
  },
};
