/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { signOut } from '../auth/auth.slice';
import { selectResetPassword } from './resetPassword.slice';
import ResetPassword from './resetPassword.view';

export interface IResetPasswordAsyncContainer {}

const ResetPasswordAsyncContainer: React.FC<IResetPasswordAsyncContainer> = ({}: IResetPasswordAsyncContainer) => {
  const navigate = useNavigate();
  const resetPassword = useAppSelector(selectResetPassword);
  const { responseStatus, responseMessage } = resetPassword;

  useEffect(() => {
    if (responseMessage && responseStatus === 'true') {
      signOut();
      navigate('/signin');
    }
  }, [responseStatus]);

  return <ResetPassword />;
};

export default memo(ResetPasswordAsyncContainer);
