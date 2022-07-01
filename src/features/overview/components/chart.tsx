/* eslint-disable @typescript-eslint/ban-types */
import React, { memo } from 'react';
import { Chart } from 'react-google-charts';

import { Box, Paper } from '@mui/material';

interface IChartComponent {
  data: any;
  options: any;
  chartType: any;
}

const ChartComponent: React.FC<IChartComponent> = ({
  data = [],
  chartType,
  options,
}) => {
  return (
    <Paper elevation={0} sx={{ height: '100%' }}>
      {data ? (
        <Chart
          chartType={chartType}
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No data available
        </Box>
      )}
    </Paper>
  );
};

export default memo(ChartComponent);
