import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Clients from './features/clients/Clients';
import Debugger from './features/debugger/Debugger';
import { LoginView, SignupView } from './features/auth';

import { Dashboard } from './features/dashboard';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Debugger />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/debugger" element={<Debugger />} />
        <Route path="/signin" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
