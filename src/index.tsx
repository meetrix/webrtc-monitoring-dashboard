import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import App from './App';
import { store } from './app/store';
import { theme } from './app/theme';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { URLParametersProvider } from './app/providers/URLParameters';
import { AuthProvider } from './app/providers/AuthProvider';

// declare module '@mui/styles' {
//   // eslint-disable-next-line
//   interface DefaultTheme extends Theme {}
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <URLParametersProvider>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </StyledEngineProvider>
        </AuthProvider>
      </URLParametersProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
