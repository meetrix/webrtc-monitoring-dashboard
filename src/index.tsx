import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { Theme } from '@mui/material/styles';
import App from './App';
import { store } from './app/store';
import { theme } from './app/theme';
import './index.css';
import * as serviceWorker from './serviceWorker';

// declare module '@mui/styles' {
//   // eslint-disable-next-line
//   interface DefaultTheme extends Theme {}
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
