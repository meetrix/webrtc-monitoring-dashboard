/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupView from './signup.view';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { SignupAsync, selectAuth } from './auth.slice';

export interface ISignupContainer {}

const SignupContainer: React.FC<ISignupContainer> = ({}: ISignupContainer) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    // dispatch(getSettingsAsync([]));
  }, []);

  const handleSignUp = (data: any) => {
    dispatch<any>(SignupAsync(data));
  };
  return <SignupView handleSignUp={handleSignUp} />;
};

export default memo(SignupContainer);
