/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginView, SignupView } from '../features/auth';
import RouteWrapper from './RouteWrapper';
import Clients from '../features/clients/Clients';
import Debugger from '../features/debugger/Debugger';
import { EmailRoute } from '../features/emailRoute';
import VerificationLinkExpirationMessage from '../components/TokenExpirationMessage/VerificationLinkExpirationMessage';
import ResetLinkExpirationMessage from '../components/TokenExpirationMessage/ResetLinkExpirationMessage';

const routesList = [
  {
    path: '/signin',
    exact: true,
    isPrivate: false,
    component: <LoginView />,
  },
  {
    path: '/signup',
    exact: true,
    isPrivate: false,
    component: <SignupView />,
  },
  {
    path: '/clients',
    exact: true,
    isPrivate: true,
    component: <Clients />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/debugger',
    exact: true,
    isPrivate: true,
    component: <Debugger />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/emailroute',
    exact: true,
    isPrivate: true,
    component: <EmailRoute />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/verificationtoken_expired',
    exact: true,
    isPrivate: true,
    component: <VerificationLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/resetpasswordtoken_expired',
    exact: true,
    isPrivate: true,
    component: <ResetLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
];

const Routes2 = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesList.map((route) => (
          <Route
            path={route.path}
            element={
              <RouteWrapper
                component={route.component}
                isPrivate={route.isPrivate}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default memo(Routes2);
