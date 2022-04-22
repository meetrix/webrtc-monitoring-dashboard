import React, { memo, useEffect } from 'react';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

const generateData = (start: any, end: any, step: any) => {
  const data = [];
  for (let i = start; i < end; i += step) {
    data.push({
      splineValue: Math.sin(i) / i,
      lineValue: (i / 15) ** 2.718 - 0.2,
      argument: i,
    });
  }

  return data;
};

export interface ChartComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  id?: string;
  data: any;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  classes,
  ...otherProps
}: ChartComponentProps) => {
  // let data;

  // useEffect(() => {
  //   data = generateData(2.5, 12, 0.5);
  // }, []);

  return (
    <Chart {...otherProps}>
      <ArgumentAxis />
      <ValueAxis />
      <LineSeries valueField="value" argumentField="argument" />
    </Chart>
  );
};

export default memo(withStyles(styles)(ChartComponent));
