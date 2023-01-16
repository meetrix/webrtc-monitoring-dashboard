// import debugLib from 'debug';
const debugLib = require('debug');

const debug = debugLib('localStorageUtils:');
debug.enabled = true;

export const TOKEN_KEY = 'token';
// const PROFILE_KEY = 'profile';

// export const getUserProfile = () => {
//   try {
//     // We save the userprofile in local storage,
//     const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '');

//     return profile;
//   } catch (error) {
//     debug('Error, could not parse profile from local storage', error);
//     return null;
//   }
// }

// export const removeUserProfile = () => {
//   localStorage.removeItem(PROFILE_KEY);
// }

export const getToken = (): string | null => {
  try {
    // We save the userprofile in local storage,
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    debug('Error, could not parse token from local storage', error);
    return null;
  }
};

export const setToken = (token: string): void => {
  try {
    return localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    debug('Error, could not store token in local storage', error);
    throw error;
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
