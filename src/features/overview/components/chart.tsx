/* eslint-disable @typescript-eslint/ban-types */
import React, { memo } from 'react';
import { Chart } from 'react-google-charts';

import { Box, Paper } from '@mui/material';
import { Typography } from '../../../components/Typography';
import theme from '../../../app/theme';

interface IChartComponent {
  data: any;
  options: any;
  chartType: any;
  title?: string;
  topRightElement?: any;
}

const ChartComponent: React.FC<IChartComponent> = ({
  data = [],
  chartType,
  options,
  title,
  topRightElement,
}) => {
  return (
    <Paper elevation={0} sx={{ height: '100%' }}>
      <Box sx={{ margin: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '10px',
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary.dark }}>
            {title}
          </Typography>
          <Box>{topRightElement}</Box>
        </Box>
        {data ? (
          <Chart chartType={chartType} data={data} options={options} />
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
      </Box>
    </Paper>
  );
};

export default memo(ChartComponent);
