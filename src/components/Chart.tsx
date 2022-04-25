import React, { memo, PureComponent } from 'react';
import { ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        layout="horizontal"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Line dataKey="pv" stroke="#8884d8" />
        <Line dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(withStyles(styles)(ChartComponent));
