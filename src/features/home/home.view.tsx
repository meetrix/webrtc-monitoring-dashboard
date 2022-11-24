/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';

import styles from './home.styles';
import { mockHomeMeetings } from '../../mocks/report';

export interface IHomeView extends WithStyles<typeof styles> {
  allData: any;
  meetingList: any[];
  dateRange: any;
  setDateRange: (data: any) => void;
  pageSize: number;
  page: number;
  setPage: any;
  setPageSize: any;
  loading: boolean;
}

const popperSx: any = {
  marginTop: '10px',
  color: '#5F5F5F',
  '& .MuiPickersDay-root': {
    color: '#5F5F5F',
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: '#4A74E9 !important',
  },
  '& .Mui-selected': {
    color: '#ffffff',
    backgroundColor: '#4A74E9 !important',
  },
  '& .MuiIconButton-root': {
    color: '#4A74E9',
  },
  '& .MuiPickersArrowSwitcher-button.Mui-disabled': {
    color: '#00000061 !important',
  },
};

const Home: React.FC<IHomeView> = ({
  classes,
  allData,
  meetingList = [],
  dateRange,
  setDateRange,
  page,
  pageSize,
  setPage,
  setPageSize,
  loading,
}: IHomeView) => {
  const navigate = useNavigate();
  const _columns = [
    { field: 'roomName', headerName: 'Title', flex: 1 },
    { field: 'participants', headerName: 'Participants', flex: 1 },
    { field: 'id', headerName: 'Id', flex: 2 },
    { field: 'created', headerName: 'Created Date', flex: 2 },
    { field: 'destroyed', headerName: 'End Date', flex: 2 },
  ];

  const todayDate = new Date();

  const defaultStartDate = moment(todayDate).subtract(1, 'week').calendar();

  const [startDate, setStartDate] = React.useState<any>(defaultStartDate);
  const [endDate, setEndDate] = React.useState<any>(todayDate);

  useEffect(() => {
    setDateRange([
      moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD'),
    ]);
  }, [startDate, endDate]);

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={(date) => setStartDate(date)}
              maxDate={endDate}
              PaperProps={{
                sx: popperSx,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ shrink: false }}
                  // className={classes.datePicker}
                  inputProps={{ readOnly: true }}
                  value={
                    startDate !== 'Invalid date'
                      ? moment(startDate).format('YYYY-MM-DD')
                      : ''
                  }
                />
              )}
            />
            <div>&nbsp; To &nbsp;</div>

            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              maxDate={todayDate}
              PaperProps={{
                sx: popperSx,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ shrink: false }}
                  // className={classes.datePicker}
                  inputProps={{ readOnly: true }}
                  value={
                    endDate !== 'Invalid date'
                      ? moment(endDate).format('YYYY-MM-DD')
                      : ''
                  }
                />
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
            rowsPerPageOptions={[10, 20, 50]}
            paginationMode="server"
            page={page}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            onPageChange={(newPage: any) => setPage(newPage)}
            rowCount={allData?.total}
            loading={loading}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Home);
