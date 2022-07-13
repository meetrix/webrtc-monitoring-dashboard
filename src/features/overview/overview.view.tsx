/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';

import { WithStyles, withStyles } from '@mui/styles';
import { Box, Grid, TextField, ButtonProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { CalendarPickerView } from '@mui/x-date-pickers';

import styles from './overview.styles';
import Chart from './components/chart';
import { Typography } from '../../components/Typography';
import getUrlParams from '../../utils/urlUtils';

interface IOverviewView extends WithStyles<ButtonProps & typeof styles> {
  summaryList: DayData[];
  getTroubleshooterData: Function;
}

interface IDatePicker {
  value: any;
  onChange: (value: any, keyboardInputValue?: string | undefined) => void;
  maxDate?: any;
  openTo?: any;
  classes?: string;
  views?: CalendarPickerView[];
  inputFormat?: string;
}

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

const DatePicker = ({
  value,
  onChange,
  maxDate,
  openTo,
  classes,
  views = ['year', 'month', 'day'],
  inputFormat = 'dd/MM/yyyy',
}: IDatePicker) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat={inputFormat}
        views={views}
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        openTo={openTo}
        PaperProps={{
          sx: popperSx,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: false }}
            className={classes}
          />
        )}
      />
    </LocalizationProvider>
  );
};

interface DayData {
  _id: string;
  browser: number;
  camera: number;
  microphone: number;
  network: number;
  passed: number;
  total: number;
}

const Overview: React.FC<IOverviewView> = ({
  classes,
  summaryList,
  getTroubleshooterData,
}: IOverviewView) => {
  const { mockStats } = getUrlParams();
  const now = new Date();

  const [startDate, setStartDate] = useState<Date>(
    moment(now).subtract(1, 'month').toDate()
  );
  const [endDate, setEndDate] = useState<Date>(now);

  const [testByDate, setTestByDate] = useState<Date>(now);
  const selectedMonthBar = moment(testByDate).format('MMM yyyy');
  const [testByCategory, setTestByCategory] = useState<Date>(now);
  const selectedDate = moment(testByCategory).format('yyyy-MM-DD');
  const [lineChartDate, setLineChartDate] = useState<Date>(now);
  const selectedMonthLine = moment(lineChartDate).format('MMM yyyy');

  useEffect(() => {
    if (!mockStats) {
      getTroubleshooterData({
        startTime: startDate.toISOString().substring(0, 10),
        endTime: endDate.toISOString().substring(0, 10),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const summary =
    summaryList?.map((dayData) => {
      const date = moment(dayData._id);

      return {
        date,
        day: date.format('ddd'),
        month: date.format('MMM yyyy'),
        ...dayData,
      };
    }) || [];

  const testByDateData0 = summary
    .filter((stats) => stats.month === selectedMonthBar)
    .reduce((acc, stats) => {
      return {
        ...acc,
        [stats.day]: [
          (acc[stats.day]?.[0] || 0) + stats.passed,
          (acc[stats.day]?.[1] || 0) + stats.total - stats.passed,
        ] as [number, number],
      };
    }, {} as { [day: string]: [number, number] });
  const testByDateData = [
    ['Day', 'Success', 'Fail'],
    ...['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => [
      day,
      testByDateData0[day]?.[0] || 0,
      testByDateData0[day]?.[1] || 0,
    ]),
  ];

  const testByCategoryData0 = summary
    .filter((stats) => stats._id === selectedDate)
    .reduce(
      (acc, stats) => ({
        Camera: [
          acc.Camera[0] + stats.camera,
          acc.Camera[1] + stats.total - stats.camera,
        ] as [number, number],
        Microphone: [
          acc.Microphone[0] + stats.microphone,
          acc.Microphone[1] + stats.total - stats.microphone,
        ] as [number, number],
        Browser: [
          acc.Browser[0] + stats.browser,
          acc.Browser[1] + stats.total - stats.browser,
        ] as [number, number],
        Network: [
          acc.Network[0] + stats.network,
          acc.Network[1] + stats.total - stats.network,
        ] as [number, number],
      }),
      {
        Camera: [0, 0],
        Microphone: [0, 0],
        Browser: [0, 0],
        Network: [0, 0],
      } as { [category: string]: [number, number] }
    );
  const testByCategoryData = [
    ['Category', 'Success', 'Fail'],
    ...['Browser', 'Microphone', 'Camera', 'Network'].map((category) => [
      category,
      testByCategoryData0[category][0],
      testByCategoryData0[category][1],
    ]),
  ];

  const lineChartData0 = summary
    .filter((stats) => stats.month === selectedMonthLine)
    .reduce((acc, stats) => {
      return {
        ...acc,
        [stats.date.date()]: [
          (acc[stats.date.date()]?.[0] || 0) + stats.passed,
          (acc[stats.date.date()]?.[1] || 0) + stats.total - stats.passed,
        ] as [number, number],
      };
    }, {} as { [day: string]: [number, number] });
  const lineChartData = [
    ['Day', 'Success', 'Fail'],
    ...Array.from(Array(31), (_, index) => index + 1).map((day) => [
      day,
      lineChartData0[day]?.[0] || 0,
      lineChartData0[day]?.[1] || 0,
    ]),
  ];

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={classes.pathText}>Troubleshooter &gt; Overview</div>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body1">From: &nbsp;</Typography>
          <DatePicker
            classes={classes.datePicker}
            value={startDate}
            onChange={setStartDate}
            maxDate={now}
          />
          <Typography sx={{ marginLeft: 2 }} variant="body1">
            To: &nbsp;
          </Typography>
          <DatePicker
            classes={classes.datePicker}
            value={endDate}
            onChange={setEndDate}
            maxDate={now}
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
            data={mockStats ? TestByDateSample : testByDateData}
            chartType="ColumnChart"
            options={chart1Options}
            title="Failed vs Successful Tests by Date"
            topRightElement={
              <DatePicker
                views={['year', 'month']}
                inputFormat="MMM yyyy"
                classes={classes.datePicker}
                value={testByDate}
                onChange={setTestByDate}
                maxDate={now}
                openTo="month"
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            data={mockStats ? TestByDateCategory : testByCategoryData}
            chartType="ColumnChart"
            options={chart2Options}
            title="Failed vs Successful Tests by Category"
            topRightElement={
              <DatePicker
                classes={classes.datePicker}
                value={testByCategory}
                onChange={setTestByCategory}
                inputFormat="dd/MM/yyyy"
                maxDate={now}
                openTo="day"
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={mockStats ? sampleData : lineChartData}
            chartType="LineChart"
            options={chart1Options}
            title="Failed vs Successful Tests"
            topRightElement={
              <DatePicker
                classes={classes.datePicker}
                views={['year', 'month']}
                inputFormat="MMM yyyy"
                value={lineChartDate}
                onChange={setLineChartDate}
                maxDate={now}
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
