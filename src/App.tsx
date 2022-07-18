import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { AppContainer } from './features/app';
import { MainLayout } from './components/layout';
import Routes from './routes';

const App = (): React.ReactElement => {
  const tagManagerArgs = {
    gtmId: 'GTM-N8NWRND',
  };

  useEffect(() => {
    ReactGA.initialize('UA-118777783-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <MainLayout>
      <AppContainer />
      <Routes />
    </MainLayout>
  );
};

export default App;
