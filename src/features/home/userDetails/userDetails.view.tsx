/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Grid, Paper, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';

import styles from './userDetails.styles';
import { userErrorsAsync } from './userDetails.slice';
import { useAppDispatch } from '../../../app/hooks';

export interface IUserDetailsView extends WithStyles<typeof styles> {
  userList?: any;
  userErrorList?: any;
}

const UserDetails: React.FC<IUserDetailsView> = ({
  classes,
  userList,
  userErrorList,
}: IUserDetailsView) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch<any>(userErrorsAsync('636dd461d68965322643415a'));
  }, []);

  const columns = [
    { field: 'errorValue', headerName: 'Error Value', flex: 1 },
    { field: 'errorType', headerName: 'Error Type', flex: 1 },
    { field: 'eventSourceType', headerName: 'Event Source Type', flex: 1 },
    { field: 'eventSourceId', headerName: 'Event Source Id', flex: 1 },
    { field: 'roomId', headerName: 'Room Id', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];

  const handleRowClick = (
    params: any // GridRowParams
  ) => {
    // console.log('Row', params?.row);
    // navigate('/dashboard/meeting-details');
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography className={classes.titleText} variant="h6">
          Users debugger
        </Typography>

        <div className={classes.tableContainer}>
          <Table
            rows={userErrorList}
            getRowId={(row: any) => row._id}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(UserDetails);
