/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Box, Grid, Paper, TextField } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import styles from './overview.styles';
import Chart from './components/chart';
import { Typography } from '../../components/Typography';

type IOverviewView = WithStyles<typeof styles>;

interface IDatePicker {
  value: any;
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  maxDate?: any;
  openTo?: any;
}

const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

const sampleData = [
  ['Tests', 'Success', 'Fail'],
  ['2010', 10, 24],
  ['2020', 16, 22],
  ['2030', 28, 19],
  ['2040', 24, 19],
  ['2050', 26, 19],
];

const TestByDateSample = [
  ['Day', 'Success', 'Fail'],
  ['Mon', 10, 24],
  ['Tue', 16, 22],
  ['Wed', 28, 19],
  ['Thu', 24, 19],
  ['Fri', 26, 14],
  ['Sat', 26, 16],
  ['Sun', 15, 13],
];

const TestByDateCategory = [
  ['Category', 'Success', 'Fail'],
  ['Camera', 10, 24],
  ['Microphone', 16, 22],
  ['Network', 28, 19],
  ['Browser', 24, 19],
];

console.log('kkkk heightOutput', window.innerHeight);

const chart1Options = {
  height: window.innerHeight / 3,
  legend: { position: 'top', maxLines: 3 },
  bar: { groupWidth: '75%' },
  chartArea: {
    height: '84%',
    width: '94%',
  },
  colors: ['#5ECCC8', '#EB514A'],
};

const chart2Options = {
  height: window.innerHeight / 3,
  legend: { position: 'top', maxLines: 3 },
  bar: { groupWidth: '75%' },
  isStacked: true,
  chartArea: {
    height: '84%',
    width: '94%',
  },
  colors: ['#5ECCC8', '#EB514A'],
};

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

const Overview: React.FC<IOverviewView> = ({ classes }: IOverviewView) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [testByDate, setTestByDate] = useState<Date | null>(null);
  const [testbyCatagory, setTestbyCategory] = useState<Date | null>(null);
  const [lineChartDate, setLineChartDate] = useState<Date | null>(null);

  const DatePicker = ({ value, onChange, maxDate, openTo }: IDatePicker) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={(date) => onChange(date)}
          maxDate={maxDate}
          openTo={openTo}
          PaperProps={{
            sx: popperSx,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: false }}
              className={classes.datePicker}
            />
          )}
        />
      </LocalizationProvider>
    );
  };

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={classes.pathText}>Troubleshooter &gt; Overview</div>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1">From: &nbsp;</Typography>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            maxDate={new Date()}
          />
          <Typography sx={{ marginLeft: 2 }} variant="body1">
            To: &nbsp;
          </Typography>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            maxDate={new Date()}
          />
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          height: 'calc(100% - 37px)',
        }}
      >
        <Grid item xs={6}>
          <Chart
            data={TestByDateSample}
            chartType="ColumnChart"
            options={chart1Options}
            title="Failed vs Succeful Tests by Date"
            topRightElement={
              <DatePicker
                value={testByDate}
                onChange={setTestByDate}
                maxDate={new Date()}
                openTo="month"
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            data={TestByDateCategory}
            chartType="ColumnChart"
            options={chart2Options}
            title="Failed vs Succeful Tests by Category"
            topRightElement={
              <DatePicker
                value={testbyCatagory}
                onChange={setTestbyCategory}
                maxDate={new Date()}
                openTo="day"
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={sampleData}
            chartType="LineChart"
            options={chart1Options}
            title="Failed vs Succeful Tests"
            topRightElement={
              <DatePicker
                value={lineChartDate}
                onChange={setLineChartDate}
                maxDate={new Date()}
                openTo="month"
              />
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(withStyles(styles)(Overview));
