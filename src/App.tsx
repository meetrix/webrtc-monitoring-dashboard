import React from 'react';
import { AppContainer } from './features/app';
import { MainLayout } from './components/layout';
import Routes from './routes';

const App = (): React.ReactElement => {
  return (
    <MainLayout>
      <AppContainer />
      <Routes />
    </MainLayout>
  );
};

export default App;
