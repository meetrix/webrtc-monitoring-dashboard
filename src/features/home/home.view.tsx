/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Grid, Paper, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';

import styles from './home.styles';
import { mockHomeMeetings } from '../../mocks/report';

export type IHomeView = WithStyles<typeof styles>;

const Home: React.FC<IHomeView> = ({ classes }: IHomeView) => {
  const navigate = useNavigate();
  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'start', headerName: 'Start', flex: 1 },
    { field: 'end', headerName: 'End', flex: 1 },
    { field: 'modarator', headerName: 'Modarator', flex: 1 },
    { field: 'participants', headerName: 'Participants', flex: 1 },
  ];

  const handleRowClick = (
    params: any // GridRowParams
  ) => {
    console.log('Row', params?.row);
    navigate('/dashboard/meeting-details');
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography className={classes.titleText} variant="h6">
          Video conferencing debugger
        </Typography>
        <Grid container>
          <Grid item sm={4} textAlign="center">
            Total Conference
            <br />
            <Typography variant="h5">6</Typography>
          </Grid>
          <Grid item sm={4} textAlign="center">
            Total Users
            <br />
            <Typography variant="h5">45</Typography>
          </Grid>
          <Grid item sm={4} textAlign="center">
            Total Minutes
            <br />
            <Typography variant="h5">230</Typography>
          </Grid>
        </Grid>

        <div className={classes.tableContainer}>
          <Table
            rows={mockHomeMeetings}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Home);
