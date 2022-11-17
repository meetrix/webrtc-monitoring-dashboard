/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Button, Paper, Typography } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../../components/Table';

import styles from './userList.styles';
import { selectUserErrors, userErrorsAsync } from './userList.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export interface IUserDetailsView extends WithStyles<typeof styles> {
  userList?: any;
}

const UserDetails: React.FC<IUserDetailsView> = ({
  classes,
  userList,
}: IUserDetailsView) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userErrorList } = useAppSelector(selectUserErrors);

  const { userId, roomId } = useParams();

  useEffect(() => {
    dispatch<any>(userErrorsAsync(userId));
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
    params: any // RowParams
  ) => {
    // console.log('Row', params?.row);
    // navigate('/dashboard/meeting-details');
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <div>
          <Button
            onClick={() => navigate(`/dashboard/${roomId}`)}
            variant="text"
          >
            Back
          </Button>
        </div>
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
