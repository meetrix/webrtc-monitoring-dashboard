/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Typography } from '../../components/Typography';
import styles from './auth.styles';

import { Logo as DefaultLogo } from '../../assets/icons';

// interface IGeneralSettings {

// }
interface IAuthLayout extends WithStyles<typeof styles> {
  children?: any;
}

const AuthLayout: React.FC<IAuthLayout> = ({
  classes,
  children,
}: IAuthLayout) => {
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={7} className={classes.leftGrid}>
        <div>
          <Typography component="h3" variant="h4" className={classes.heading}>
            Please login to the sytem with credentials.
          </Typography>
          <br />
        </div>
      </Grid>
      <Grid item xs={12} sm={5} className={classes.rightGrid}>
        <div className={classes.formWrapper}>{children}</div>
      </Grid>
    </Grid>
  );
};

export default memo(withStyles(styles)(AuthLayout));
