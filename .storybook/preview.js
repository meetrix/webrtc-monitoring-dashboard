import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@mui/styles';
import { theme } from '../src/app/theme';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
addDecorator((story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
));