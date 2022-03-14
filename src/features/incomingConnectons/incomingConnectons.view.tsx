/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './incomingConnectons.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
// import {
//   forgotPasswordAsync,
//   selectForgotPassword,
// } from './incomingConnectons.slice';

type IForgotPasswordView = WithStyles<typeof styles>;

const ForgotPassword: React.FC<IForgotPasswordView> = ({
  classes,
}: IForgotPasswordView) => {
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Typography component="h3">Generate your token</Typography>
        <Grid container spacing={2} className={classes.inputWrapper}>
          <Grid item sm={12} lg={8}>
            <TextField label="Enter your website link here" />
          </Grid>
          <Grid item sm={12} lg={4}>
            <Button
              id="generate-token"
              label="Generate your token"
              variant="contained"
              fullWidth
            />
          </Grid>
        </Grid>
        <Link to="/" className={classes.link}>
          Learn more
        </Link>
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(ForgotPassword));
