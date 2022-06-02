export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = async (token: string) => {
  window.localStorage.setItem('token', token);
};
