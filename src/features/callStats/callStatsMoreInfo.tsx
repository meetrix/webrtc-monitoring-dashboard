/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Grid,
  Paper,
  Typography,
  Stack,
  Breadcrumbs,
  // Link,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStatsMoreInfo.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Table from '../../components/Table';

type ICallStatsMoreInfoView = WithStyles<typeof styles>;

const CallStatsMoreInfo: React.FC<ICallStatsMoreInfoView> = ({
  classes,
}: ICallStatsMoreInfoView) => {
  return (
    <div className={classes.root}>
      <Stack spacing={2}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          className={classes.breadCrumb}
        >
          <Link
            to="/dashboard/call-stat-monitoring"
            className={classes.breadCrumbLink}
          >
            <Typography variant="h6" color="GrayText">
              Call stat monitoring
            </Typography>
          </Link>
          <Typography variant="h6" color="black">
            807930-8329
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Paper elevation={0} className={classes.bottomPaper}>
        Text
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(CallStatsMoreInfo));
