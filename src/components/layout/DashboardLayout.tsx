/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { withStyles, WithStyles } from '@mui/styles';
import { createStyles, Grid, Theme } from '@mui/material';
import { Typography } from '../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
    },
    bodyContent: {
      flexGrow: 1,
    },
  });
};
interface IDashboardLayout extends WithStyles<typeof styles> {
  children?: any;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({
  classes,
  children,
}: IDashboardLayout) => {
  return (
    <div className={classes.root}>
      <div>Sidbar</div>
      <div className={classes.bodyContent}>{children}</div>
    </div>
  );
};

export default memo(withStyles(styles)(DashboardLayout));
