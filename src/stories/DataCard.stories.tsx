import { Meta, Story } from '@storybook/react';
import { Box } from '@mui/material';
import React from 'react';
import DataCard, { DataCardComponentPropsType } from '../components/DataCard';

export default {
  title: 'Components/DataCard',
  component: DataCard,
} as Meta;

const Template: Story<DataCardComponentPropsType> = (args) => (
  <Box
    sx={{
      maxWidth: '20rem',
    }}
  >
    <DataCard {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      title: 'User details',
      body: [
        { key: 'Sent', value: '1000 KB' },
        { key: 'Received', value: '1000 KB' },
      ],
    },
  ],
};
