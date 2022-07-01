/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import { Box, Grid, Paper } from '@mui/material';
import Chart from './components/chart';

import styles from './overview.styles';

type IOverviewView = WithStyles<typeof styles>;

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
};

const chart2Options = {
  title: 'Test',
  height: 400,
  legend: { position: 'top', maxLines: 3 },
  bar: { groupWidth: '75%' },
  isStacked: true,
};

const Overview: React.FC<IOverviewView> = ({ classes }: IOverviewView) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Chart
            data={sampleData}
            chartType="ColumnChart"
            options={chart1Options}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            data={sampleData}
            chartType="ColumnChart"
            options={chart2Options}
          />
        </Grid>
        <Grid item xs={12}>
          <Chart
            data={sampleData}
            chartType="LineChart"
            options={chart1Options}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(withStyles(styles)(Overview));
