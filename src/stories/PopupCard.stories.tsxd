import { Meta, Story } from '@storybook/react';
import React from 'react';
import PopupCard, { PopupCardProps } from '../components/PopupCard';

const SampleData = {
  status: 'Connected',
  items: [
    {
      label: 'Peer Connection',
      value: '8',
    },
    {
      label: 'Bytes Received',
      value: '10560 Kb',
    },
    {
      label: 'Bytes Sent',
      value: '10560 Kb',
    },
    {
      label: 'Jitter',
      value: '0',
    },
    {
      label: 'Packet Loss',
      value: '-',
    },
    {
      label: 'Local Ip',
      value: '123.456.789 1: 1:2345',
    },
    {
      label: 'Remote Ip',
      value: '123.456.789 1: 1:2345',
    },
  ],
};
export default {
  title: 'Components/PopupCard',
  component: PopupCard,
} as Meta;

const Template: Story<PopupCardProps> = (args) => (
  <PopupCard {...args} data={SampleData} />
);

export const Primary = Template.bind({});
Primary.args = {};
