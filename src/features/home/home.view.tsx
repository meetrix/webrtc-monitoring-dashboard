/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
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
  meetingList: any;
  dateRange: any;
  setDateRange: (data: any) => void;
}

const Home: React.FC<IHomeView> = ({
  classes,
  meetingList,
  dateRange,
  setDateRange,
}: IHomeView) => {
  const navigate = useNavigate();
  const columns = [
    { field: 'createdAt', headerName: 'Created Date', flex: 1 },
    { field: 'roomName', headerName: 'Meeting Title', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated Date', flex: 1 },
  ];

  const handleRowClick = (
    params: any // GridRowParams
  ) => {
    navigate(`/dashboard/${params?.row?._id}`);
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
            <Typography variant="h5">{meetingList?.length}</Typography>
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

export default withStyles(styles)(Home);
