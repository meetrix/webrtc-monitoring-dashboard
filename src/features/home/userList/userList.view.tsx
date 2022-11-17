/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../../components/Table';

import styles from './userList.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export interface IUserListView extends WithStyles<typeof styles> {
  userList?: any;
}

const UserList: React.FC<IUserListView> = ({
  classes,
  userList,
}: IUserListView) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { roomId } = useParams();

  // const { userErrorList } = useAppSelector(selectUserErrors);

  const columns = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'participantName', headerName: 'Name', flex: 1 },
    { field: 'roomName', headerName: 'Room Name', flex: 1 },
    { field: 'eventSourceId', headerName: 'Event Source Id', flex: 1 },
    { field: 'roomId', headerName: 'Room Id', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];

  const handleRowClick = (
    params: any // RowParams
  ) => {
    navigate(`/dashboard/meeting/${roomId}/${params?.row?._id}`);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography className={classes.titleText} variant="h6">
          User List
        </Typography>

        <div className={classes.tableContainer}>
          <Table
            rows={userList}
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

export default withStyles(styles)(UserList);
