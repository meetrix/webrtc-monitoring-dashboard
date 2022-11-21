/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Button, Paper, Typography } from '@mui/material';

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
    { field: 'participantName', headerName: 'Name', flex: 1 },
    { field: '_id', headerName: 'User Id', flex: 2 },
    // { field: 'roomName', headerName: 'Room Name', flex: 1 },
    { field: 'joined', headerName: 'Joined', flex: 1 },
    { field: 'left', headerName: 'Left', flex: 1 },
    // { field: 'createdAt', headerName: 'Created At', flex: 1 },
    // { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];

  const handleRowClick = (
    params: any // RowParams
  ) => {
    navigate(`/dashboard/${roomId}/${params?.row?.id}`);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <div>
          <Button onClick={() => navigate(`/dashboard`)} variant="text">
            &#10094; back
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography className={classes.titleText} variant="h6">
            User List
          </Typography>
          <div style={{ display: 'flex' }}>
            <div>
              <Typography variant="body2">Room Name</Typography>
              <Typography variant="body2">Room Id</Typography>
            </div>
            <div>
              <Typography variant="body2">
                &nbsp;: {userList[0]?.roomId.roomName || 'Not available'}
              </Typography>
              <Typography variant="body2">
                &nbsp;: {userList[0]?.roomId.id || 'Not available'}
              </Typography>
            </div>
          </div>
        </div>

        <div className={classes.tableContainer}>
          <Table
            rows={userList}
            getRowId={(row: any) => row._id}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
            getRowClassName={(params: any) =>
              `fault-status-${params.row.faulty}`
            }
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(UserList);
