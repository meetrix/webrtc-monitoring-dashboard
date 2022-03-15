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

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const CallStats: React.FC<ICallStatsView> = ({ classes }: ICallStatsView) => {
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="GrayText">
        TOKENS
      </Typography>
      <Paper elevation={0} className={classes.bottomPaper}>
        <Table rows={rows} columns={columns} />
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(CallStats));
