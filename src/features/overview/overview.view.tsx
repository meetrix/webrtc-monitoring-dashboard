/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LinearProgress } from '../../components/Progress';

import styles from './overview.styles';

type IOverviewView = WithStyles<typeof styles>;

const Overview: React.FC<IOverviewView> = ({ classes }: IOverviewView) => {
  return (
    <div className={classes.root}>
      <div>Overview</div>
    </div>
  );
};

export default memo(withStyles(styles)(Overview));
