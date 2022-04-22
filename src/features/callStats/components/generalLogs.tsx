import React, { memo } from 'react';
import { Grid, Box, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import DataCard from '../../../components/DataCard';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
    cardsWrapper: {
      display: 'flex',
      gap: 16,
      marginTop: 16,
    },
  });
};

const SampleData = [
  {
    title: 'User details',
    body: [
      { key: 'Sub Heading' },
      { key: 'Received', value: '1000 KB' },
      { key: 'Received', value: '1000 KB' },
      { key: 'Received', value: '1000 KB' },
    ],
  },
];

const SampleTableData = {
  title: 'Test table',
  rows: [
    { type: 'Audio', mime: 'Audio/Opus', jitter: 0, packetLoss: 'Undefined' },
    { type: 'Video', mime: 'Video/Vp8', jitter: 0, packetLoss: 'Undefined' },
    { type: 'Audio', mime: 'Audio/Opus', jitter: 0, packetLoss: 'Undefined' },
    { type: 'Video', mime: 'Video/Vp8', jitter: 0, packetLoss: 'Undefined' },
  ],
};
export type IGeneralLogsProps = WithStyles<typeof styles>;

const GeneralLogs = ({ classes }: IGeneralLogsProps) => {
  return (
    <Box>
      <Box className={classes.cardsWrapper}>
        <DataCard data={SampleData} />
        <DataCard data={SampleData} />
        <DataCard data={SampleData} />
      </Box>
      <Box className={classes.cardsWrapper}>
        <DataCard tableData={SampleTableData} />
        <DataCard tableData={SampleTableData} />
      </Box>
    </Box>
  );
};

export default memo(withStyles(styles)(GeneralLogs));
