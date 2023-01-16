import { Meta, Story } from '@storybook/react';
import { Box } from '@mui/material';
import React from 'react';
import DataCard, { DataCardComponentPropsType } from '../components/DataCard';

export default {
  title: 'Components/DataCard',
  component: DataCard,
} as Meta;

const Template: Story<DataCardComponentPropsType> = (args) => (
  <Box>
    <DataCard {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      event: 'User details',
      body: [
        { key: 'Sub Heading' },
        { key: 'Received', value: '1000 KB' },
        { key: 'Received', value: '1000 KB' },
        { key: 'Received', value: '1000 KB' },
      ],
    },
  ],
};

export const Table = Template.bind({});
Table.args = {
  tableData: {
    event: 'Test table',
    body: [
      { type: 'Audio', mime: 'Audio/Opus', jitter: 0, packetLoss: 'Undefined' },
      { type: 'Video', mime: 'Video/Vp8', jitter: 0, packetLoss: 'Undefined' },
      { type: 'Audio', mime: 'Audio/Opus', jitter: 0, packetLoss: 'Undefined' },
      { type: 'Video', mime: 'Video/Vp8', jitter: 0, packetLoss: 'Undefined' },
    ],
  },
};
