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
}

const sampleData = [
  ['Year', 'Data1', 'Data2'],
  ['2010', 10, 24],
  ['2020', 16, 22],
  ['2030', 28, 19],
  ['2040', 24, 19],
  ['2050', 26, 19],
];

const chart1Options = {
  height: 400,
  legend: { position: 'top', maxLines: 3 },
  bar: { groupWidth: '75%' },
  chartArea: {
    width: '95%',
  },
};

const chart2Options = {
  height: 400,
  legend: { position: 'top', maxLines: 3 },
  bar: { groupWidth: '75%' },
  isStacked: true,
  chartArea: {
    width: '95%',
  },
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

  const DatePicker = ({ value, onChange, maxDate }: IDatePicker) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={(date) => onChange(date)}
          maxDate={maxDate}
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
          <Typography variant="body1">&nbsp;To: &nbsp;</Typography>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            maxDate={new Date()}
          />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Chart
            data={sampleData}
            chartType="ColumnChart"
            options={chart1Options}
            title="Failed vs Succeful Tests by Date"
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            data={sampleData}
            chartType="ColumnChart"
            options={chart2Options}
            title="Failed vs Succeful Tests by Category"
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={sampleData}
            chartType="LineChart"
            options={chart1Options}
            title="Failed vs Succeful Tests"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(withStyles(styles)(Overview));
