import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clients from './features/clients/Clients';
import Debugger from './features/debugger/Debugger';
import { LoginView, SignupView } from './features/auth';
import { EmailRoute } from './features/emailRoute';
import VerificationLinkExpirationMessage from './components/TokenExpirationMessage/VerificationLinkExpirationMessage';
import ResetLinkExpirationMessage from './components/TokenExpirationMessage/ResetLinkExpirationMessage';
import { AppContainer } from './features/app';
import { MainLayout } from './components/layout';

const App = (): React.ReactElement => {
  return (
    <MainLayout>
      <AppContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Debugger />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/debugger" element={<Debugger />} />
          <Route path="/signin" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/emailroute" element={<EmailRoute />} />
          <Route
            path="/verificationtoken_expired"
            element={<VerificationLinkExpirationMessage />}
          />
          <Route
            path="/resetpasswordtoken_expired"
            element={<ResetLinkExpirationMessage />}
          />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
