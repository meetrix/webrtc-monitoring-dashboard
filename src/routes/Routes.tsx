/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginView, SignupView } from '../features/auth';
import RouteWrapper from './RouteWrapper';
import Clients from '../features/clients/Clients';
// import Debugger from '../features/debugger/Debugger';
import { EmailRoute } from '../features/emailRoute';
import VerificationLinkExpirationMessage from '../components/TokenExpirationMessage/VerificationLinkExpirationMessage';
import ResetLinkExpirationMessage from '../components/TokenExpirationMessage/ResetLinkExpirationMessage';
import { ForgotPassword } from '../features/forgotPassword';
import { ResetPassword } from '../features/resetPassword';
import { Settings } from '../features/settings';
import { CallStatMonitoring } from '../features/callStats';
import { DetailedView } from '../features/detailedView';
import CallStatsMoreInfo from '../features/callStats/callStatsMoreInfo';
import Troubleshooter from '../features/troubleshooter';
import { Home } from '../features/home';

const routesList = [
  // {
  //   path: '/',
  //   isPrivate: false,
  //   component: <Debugger />,
  // },
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
  // {
  //   path: '/debugger',
  //   isPrivate: true,
  //   component: <Debugger />,
  //   hasNavbar: true,
  //   hasFooter: true,
  // },
  {
    path: '/emailroute',
    isPrivate: false,
    component: <EmailRoute />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/verificationtoken_expired',
    isPrivate: false,
    component: <VerificationLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/resetpasswordtoken_expired',
    isPrivate: false,
    component: <ResetLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/dashboard',
    isPrivate: true,
    hasSidebar: true,
    component: <Home />,
    hasNavbar: true,
  },
  {
    path: '/dashboard/settings',
    isPrivate: true,
    hasSidebar: true,
    component: <Settings />,
    hasNavbar: true,
  },
  {
    path: '/dashboard/call-stat-monitoring',
    isPrivate: true,
    hasSidebar: true,
    component: <CallStatMonitoring />,
    hasNavbar: true,
  },
  {
    path: '/dashboard/call-stat-monitoring/see-more',
    isPrivate: true,
    hasSidebar: true,
    component: <CallStatsMoreInfo />,
    hasNavbar: true,
  },
  {
    path: '/troubleshooter',
    isPrivate: false,
    hasSidebar: false,
    component: <Troubleshooter />,
    hasNavbar: false,
  },
  {
    path: '/dashboard/detailed-view',
    isPrivate: true,
    hasSidebar: true,
    component: <DetailedView />,
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
