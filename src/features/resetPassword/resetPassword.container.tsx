/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import ResetPassword from './resetPassword.view';

export interface IResetPasswordAsyncContainer {}

const ResetPasswordAsyncContainer: React.FC<IResetPasswordAsyncContainer> = ({}: IResetPasswordAsyncContainer) => {
  return <ResetPassword />;
};

export default memo(ResetPasswordAsyncContainer);
