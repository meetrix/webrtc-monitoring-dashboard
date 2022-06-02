/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Paper, Typography, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStats.styles';
import Table from '../../components/Table';

export interface ICallStatsView
  extends WithStyles<ButtonProps & typeof styles> {
  callStatList: any;
}

const CallStats: React.FC<ICallStatsView> = ({
  callStatList,
  classes,
}: ICallStatsView) => {
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
        <Link
          to="/dashboard/call-stat-monitoring/see-more"
          className={classes.link}
        >
          See more
        </Link>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="GrayText">
        TOKENS
      </Typography>
      <Paper elevation={0} className={classes.bottomPaper}>
        <Table
          rows={callStatList}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(CallStats));
