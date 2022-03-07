// Refer to : https://mui.com/customization/default-theme/
import {
  createTheme,
  Theme as MaterialUITheme,
  adaptV4Theme,
} from '@mui/material';

export const theme = createTheme(
  adaptV4Theme({
    palette: {
      common: {
        black: '#000000DE',
        white: '#FFFFFF',
      },
      // blue
      primary: {
        main: '#2485f6',
        light: '#90CAFF',
        dark: '#2562D0',
        contrastText: '#FFFFFF',
      },
      // gray
      secondary: {
        main: '#989898',
        light: '#ebebeb',
        dark: '#5c5c5c',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F3F3F3',
        paper: '#FFFFFF',
      },
      warning: {
        main: '#F79804DE',
        contrastText: '#fff',
      },
      info: {
        main: '#3696F3',
        contrastText: '#707070',
      },
      error: {
        main: '#F44336',
        contrastText: '#707070',
      },
      success: {
        main: '#4CAF51',
        contrastText: '#707070',
      },
    },
    typography: {
      fontFamily: 'Lato',
      h1: {
        fontSize: '6rem',
      },
      h2: {
        fontSize: '3.75rem',
      },
      h3: {
        fontSize: '3rem',
      },
      h4: {
        fontSize: '2.125rem',
      },
      h5: {
        fontSize: '1.5rem',
      },
      h6: {
        fontSize: '1.25rem',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
    },
  })
);

export type Theme = MaterialUITheme;
export default theme;
