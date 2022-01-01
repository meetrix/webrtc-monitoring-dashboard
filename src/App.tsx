import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Clients from './features/clients/Clients';
import Debugger from './features/debugger/Debugger';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/debugger" element={<Debugger />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
