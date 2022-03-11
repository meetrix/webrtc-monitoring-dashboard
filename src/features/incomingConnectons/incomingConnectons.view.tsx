/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import styles from './incomingConnectons.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import {
//   forgotPasswordAsync,
//   selectForgotPassword,
// } from './incomingConnectons.slice';

type IForgotPasswordView = WithStyles<typeof styles>;

const ForgotPassword: React.FC<IForgotPasswordView> = ({
  classes,
}: IForgotPasswordView) => {
  return <div className={classes.root}>Incoming Connection</div>;
};

export default memo(withStyles(styles)(ForgotPassword));
