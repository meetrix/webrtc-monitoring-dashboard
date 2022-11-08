/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { createStyles, makeStyles, WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper, Typography } from '@mui/material';

import Chart from 'react-google-charts';
import styles from '../home.styles';
import theme from '../../../app/theme';
import { SelectTextField } from '../../../components/TextField';
import RightsideView from './rightsideView';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '2vw',
    },
    titleText: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
      marginBottom: '20px',
      fontWeight: 500,
    },
    chartWrapper: {
      height: 200,
      marginBottom: '2vh',
    },
  })
);

const SampleChartData = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const SampleSelectUsers = [
  {
    label: 'aaa',
  },
  {
    label: 'bbb',
  },
];

const MeetingDetails = () => {
  const classes = useStyles();

  const [user, setUser] = React.useState('1');

  const handleSelectUserChange = (event: any) => {
    setUser(event.target.value as string);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <Typography className={classes.titleText} variant="h6">
            Analyze MeetingTitle
          </Typography>
        </Grid>
        <Grid item sm={6} display="flex">
          <div>
            <Typography variant="body1">Date</Typography>
            <Typography variant="body1">Time</Typography>
            <Typography variant="body1">No of participants</Typography>
            <Typography variant="body1">Moderators</Typography>
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <Typography variant="body1">: 22/08/2022</Typography>
            <Typography variant="body1">: 14.00 - 16.34</Typography>
            <Typography variant="body1">: 23</Typography>
            <Typography variant="body1">: Name</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <SelectTextField
            onChange={handleSelectUserChange}
            label="Select Users"
            value={1}
            selectItems={SampleSelectUsers}
          />
        </Grid>
        <Grid item sm={6} display="flex" alignItems="center">
          User id: 334455
        </Grid>
      </Grid>
      <Typography variant="body1">Bandwidth utilization</Typography>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <div className={classes.chartWrapper}>
            <Chart data={SampleChartData} />
          </div>
          <Typography variant="body1">
            Display poor / lost connections by user
          </Typography>
          <Typography variant="body1">Time: 10.25.46, 10.36.15</Typography>
          <Typography variant="body1">
            Audio/ Video data stream errors
          </Typography>
          <Typography variant="body1">Time: 10.25.46, 10.36.15</Typography>
        </Grid>
        <Grid item sm={6}>
          <RightsideView />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(MeetingDetails);
