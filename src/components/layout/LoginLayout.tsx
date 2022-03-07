/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { createStyles, Grid, Theme } from '@mui/material';
import { Typography } from '../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.common.white,
    },
    leftGrid: {
      backgroundColor: theme.palette.common.black,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.down('xs')]: {
        padding: '6vw',
        '& h3': {
          fontSize: '1.7rem',
        },
        '& h4': {
          fontSize: '1rem',
        },
      },
    },
    rightGrid: {
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        padding: '6vw',
      },
    },
    heading: {
      fontWeight: 600,
    },
    formWrapper: {
      padding: '5%',
    },
  });
};
interface ILoginLayout extends WithStyles<typeof styles> {
  children?: any;
}

const LoginLayout: React.FC<ILoginLayout> = ({
  classes,
  children,
}: ILoginLayout) => {
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

export default memo(withStyles(styles)(LoginLayout));
