import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import ButtonComponent, { ButtonComponentProps } from '../components/Button';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponentProps> = (args) => (
  <Box
    sx={{
      maxWidth: '5rem',
    }}
  >
    <ButtonComponent color="primary" {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Start Meeting',
  fullWidth: false,
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  color: 'secondary',
};
