/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import clsx from 'clsx';
import { LoginView, SignupView } from '../features/auth';
import { Dashboard } from '../features/dashboard';
import { Footer } from '../components/layout';
import { AppBar } from '../features/appBar';
import { getToken } from '../helper/localStorage';
import RouteWrapper from './RouteWrapper';

const routesList = [
  // {
  //   path: '/',
  //   exact: true,
  //   isPrivate: true,
  //   component: <Dashboard />,
  //   hasNavbar: true,
  //   hasFooter: true,
  // },
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
  // {
  //   path: '/terms-of-use',
  //   exact: true,
  //   isPrivate: true,
  //   component: <TermsView />,
  //   hasNavbar: true,
  //   hasFooter: true,
  // },
  // {
  //   path: '/privacy-policy',
  //   exact: true,
  //   isPrivate: true,
  //   component: <PrivacyView />,
  //   hasNavbar: true,
  //   hasFooter: true,
  // },
  // {
  //   path: '/contact-us',
  //   exact: true,
  //   isPrivate: true,
  //   component: <ContactView />,
  //   hasNavbar: true,
  //   hasFooter: true,
  // },
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
