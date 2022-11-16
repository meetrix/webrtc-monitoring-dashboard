/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Grid, Paper, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table';

import styles from './userDetails.styles';
import { mockHomeMeetings } from '../../../mocks/report';

export interface IUserDetailsView extends WithStyles<typeof styles> {
  meetingList: any;
}

const UserDetails: React.FC<IUserDetailsView> = ({
  classes,
  meetingList,
}: IUserDetailsView) => {
  const navigate = useNavigate();
  const columns = [
    { field: 'createdAt', headerName: 'Created Date', flex: 1 },
    { field: 'roomName', headerName: 'Meeting Title', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated Date', flex: 1 },
  ];

  const handleRowClick = (
    params: any // GridRowParams
  ) => {
    console.log('Row', params?.row);
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
            rows={meetingList}
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
