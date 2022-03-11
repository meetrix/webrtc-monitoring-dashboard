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
import { ForgotPassword } from '../features/forgotPassword';
import { ResetPassword } from '../features/resetPassword';
import { IncomingConnectons } from '../features/incomingConnectons';

const routesList = [
  {
    path: '/',
    isPrivate: false,
    component: <Debugger />,
  },
  {
    path: '/signin',
    isPrivate: false,
    component: <LoginView />,
  },
  {
    path: '/signup',
    isPrivate: false,
    component: <SignupView />,
  },
  {
    path: '/forgotpassword',
    isPrivate: false,
    component: <ForgotPassword />,
  },
  {
    path: '/resetpassword',
    isPrivate: false,
    component: <ResetPassword />,
  },
  {
    path: '/clients',
    isPrivate: true,
    component: <Clients />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/debugger',
    isPrivate: true,
    component: <Debugger />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/emailroute',
    isPrivate: true,
    component: <EmailRoute />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/verificationtoken_expired',
    isPrivate: true,
    component: <VerificationLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/resetpasswordtoken_expired',
    isPrivate: true,
    component: <ResetLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/dashboard/incoming-connections',
    isPrivate: false,
    hasSidebar: true,
    component: <IncomingConnectons />,
    hasNavbar: true,
  },
];

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesList.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              <RouteWrapper
                component={route.component}
                isPrivate={route.isPrivate}
                hasNavbar={route.hasNavbar}
                hasSidebar={route.hasSidebar}
                hasFooter={route.hasFooter}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default memo(RoutesComponent);
