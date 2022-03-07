/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { memo } from 'react';
import ForgotPassword from './forgotPassword.view';

export interface IForgotPasswordAsyncContainer {}

const ForgotPasswordAsyncContainer: React.FC<IForgotPasswordAsyncContainer> = ({}: IForgotPasswordAsyncContainer) => {
  return <ForgotPassword />;
};

export default memo(ForgotPasswordAsyncContainer);
