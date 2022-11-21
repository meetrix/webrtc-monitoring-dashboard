/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {
  DateRangePicker,
  DateRange,
} from '@mui/x-date-pickers-pro/DateRangePicker';

import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';

import styles from './home.styles';
import { mockHomeMeetings } from '../../mocks/report';

export interface IHomeView extends WithStyles<typeof styles> {
  allData: any;
  meetingList: any[];
  dateRange: any;
  setDateRange: (data: any) => void;
}

const Home: React.FC<IHomeView> = ({
  classes,
  allData,
  meetingList = [],
  dateRange,
  setDateRange,
}: IHomeView) => {
  const navigate = useNavigate();
  const _columns = [
    { field: 'roomName', headerName: 'Meeting Title', flex: 1 },
    { field: 'totalParticipants', headerName: 'Participants', flex: 0.5 },
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'created', headerName: 'Created Date', flex: 0.5 },
    { field: 'destroyed', headerName: 'End Date', flex: 0.5 },
  ];

  const handleRowClick = (
    params: any // GridRowParams
  ) => {
    navigate(`/dashboard/${params?.row?.id}`);
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
            <Typography variant="h5">{allData?.total}</Typography>
          </Grid>
          <Grid item sm={4} textAlign="center">
            Total Users
            <br />
            <Typography variant="h5">{allData?.totalParticipants}</Typography>
          </Grid>
          <Grid item sm={4} textAlign="center">
            Total Minutes
            <br />
            <Typography variant="h5">{allData?.totalMinutes}</Typography>
          </Grid>
        </Grid>
        <div className={classes.datePicker}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: 'Check-in', end: 'Check-out' }}
          >
            <DateRangePicker
              value={dateRange}
              inputFormat="DD/MM/YYYY"
              onChange={(newValue) => {
                setDateRange(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </div>

        <div className={classes.tableContainer}>
          <Table
            rows={meetingList}
            columns={_columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick={false}
            hideFooterSelectedRowCount
            getRowClassName={(params: any) =>
              `fault-status-${params?.row?.faulty}`
            }
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Home);
