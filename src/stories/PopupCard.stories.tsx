import { Meta, Story } from '@storybook/react';
import React from 'react';
import PopupCard, { PopupCardProps } from '../components/PopupCard';

export default {
  title: 'Components/PopupCard',
  component: PopupCard,
} as Meta;

const Template: Story<PopupCardProps> = (args) => <PopupCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // label: 'Start Meeting',
  // fullWidth: false,
  // color: 'primary',
};
