import debugLib from 'debug';
import React, { useContext, useEffect, useState } from 'react';
import config from '../../config';
import { ACCOUNT_PROFILE } from '../../constants/apiRoutes';
import { selectAuth } from '../../features/auth/auth.slice';
import { setAPI } from '../../utils/apiUtils';
import { AxiosWrapper } from '../../utils/axiosWrapper';
import { getToken, setToken } from '../../utils/localStorageUtils';
import { getUrlParams } from '../../utils/urlUtils';
import { useAppSelector } from '../hooks';

const debug = debugLib('AuthProvider');

export interface User {
  email: string;
}

export interface AuthContextType {
  user: User;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: { email: '' },
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({ email: '' });
  const auth = useAppSelector(selectAuth);
  useEffect(() => {
    const getProfile = async () => {
      const { baseURL } = config.api;

      // retrieve token from URL if there any
      const { token: _token } = getUrlParams();
      const localToken = getToken();

      const token = _token || localToken;

      if (!token) return;
      // TODO: redirect to login

      const api = new AxiosWrapper({ baseURL, token }).getApi();
      const { data: _user } = await api.get(ACCOUNT_PROFILE);
      if (!user) {
        debug('User not found or token invalid');
        // TODO: redirect to login
        return;
      }
      // Store the correct token on localstorage
      setToken(token);
      setUser(_user);
      setAPI(api);
    };
    if (auth.isAuthenticated) getProfile();
  }, [auth.isAuthenticated]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export interface WithAuth {
  auth: AuthContextType;
}

type AuthWrapperType<T> = (Props: T) => React.ReactElement;

export const withAuth = <T,>(
  Component: React.ComponentType<T>
) => (): AuthWrapperType<T> => {
  const AuthWrapper = (props: T) => {
    const auth = useContext(AuthContext);
    return <Component auth={auth} {...props} />;
  };

  return AuthWrapper;
};
