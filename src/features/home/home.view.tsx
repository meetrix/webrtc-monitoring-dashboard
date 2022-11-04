/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Chart from '../../components/Chart';

import styles from './home.styles';
import { SelectTextField } from '../../components/TextField';

export type IHomeView = WithStyles<typeof styles>;

const SampleData = [
  {
    date: '22/07/2022',
    title: 'Meeting name 1',
    start: '14.30',
    end: '16.45',
    modarator: 'Modarator Name',
    participants: '10',
  },
  {
    date: '22/07/2022',
    title: 'Meeting name 2',
    start: '14.30',
    end: '16.45',
    modarator: 'Modarator Name',
    participants: '10',
  },
];

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

const Home: React.FC<IHomeView> = ({ classes }: IHomeView) => {
  const [user, setUser] = React.useState('1');

  const handleSelectUserChange = (event: any) => {
    setUser(event.target.value as string);
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
        <TableContainer className={classes.tableContainer}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Modarator</TableCell>
                <TableCell>Participants</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SampleData.map((row: any) => (
                <TableRow
                  // key={row.type}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.start}</TableCell>
                  <TableCell>{row.end}</TableCell>
                  <TableCell>{row.modarator}</TableCell>
                  <TableCell>{row.participants}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={0} className={classes.bottomPaper}>
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
          </Grid>
          <Grid item sm={6}>
            gggg
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Home);
