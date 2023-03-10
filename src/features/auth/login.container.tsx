/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginView from './login.view';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  clearFirstTimeUserFlagAsync,
  logInAsync,
  selectAuth,
} from './auth.slice';

export interface ILoginContainer {}

const LoginContainer: React.FC<ILoginContainer> = ({}: ILoginContainer) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth?.user?.isFirstTimeUser) {
        navigate('/dashboard/settings');
        dispatch<any>(clearFirstTimeUserFlagAsync(null));
      } else {
        navigate('/overview');
      }
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    // dispatch(getSettingsAsync([]));
  }, []);

  const handleSignIn = (data: any) => {
    dispatch<any>(logInAsync(data));
  };
  return <LoginView handleSignIn={handleSignIn} />;
};

export default memo(LoginContainer);
