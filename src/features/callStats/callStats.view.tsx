/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStats.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Table from '../../components/Table';
// import {
//   CallStatsAsync,
//   selectCallStats,
// } from './incomingConnectons.slice';

type ICallStatsView = WithStyles<typeof styles>;

const CallStats: React.FC<ICallStatsView> = ({ classes }: ICallStatsView) => {
  const columns = [
    { field: 'id', headerName: 'Client ID', flex: 1 },
    { field: 'browser', headerName: 'Browser', flex: 1 },
    { field: 'browserVersion', headerName: 'Browser version', flex: 1 },
    {
      field: 'operatingSystem',
      headerName: 'Operating System',
      flex: 1,
    },
    {
      field: 'connectedAt',
      headerName: 'Connected At',
      flex: 1,
    },
    {
      field: 'seeMore',
      headerName: '',
      flex: 1,
      sortable: false,
      align: 'center',
      renderCell: () => (
        <Link to="#" className={classes.link}>
          See more
        </Link>
      ),
    },
  ];

  const rows = [
    {
      id: '(807)930-8321',
      browser: 'Mozilla Firefox',
      browserVersion: '98.0.4758',
      operatingSystem: 'Windows 11 x64',
      connectedAt: '3, March, 2022, 11.54 AM',
    },
    {
      id: '(807)930-8322',
      browser: 'Mozilla Firefox',
      browserVersion: '98.0.4758',
      operatingSystem: 'Windows 11 x64',
      connectedAt: '3, March, 2022, 11.54 AM',
    },
    {
      id: '(807)930-8323',
      browser: 'Mozilla Firefox',
      browserVersion: '98.0.4758',
      operatingSystem: 'Windows 11 x64',
      connectedAt: '3, March, 2022, 11.54 AM',
    },
    {
      id: '(807)930-8324',
      browser: 'Mozilla Firefox',
      browserVersion: '98.0.4758',
      operatingSystem: 'Windows 11 x64',
      connectedAt: '3, March, 2022, 11.54 AM',
    },
  ];
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="GrayText">
        TOKENS
      </Typography>
      <Paper elevation={0} className={classes.bottomPaper}>
        <Table
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(CallStats));
