import React, { memo } from 'react';
import { Routes, BrowserRouter } from 'react-router-dom';

import RouteWrapper from './RouteWrapper';
import { LoginView, SignupView } from '../features/auth';
import { Dashboard } from '../features/dashboard';
// import { ContactView, PrivacyView, TermsView } from '../features/subPages';

const Routes2 = () => {
  const routesArr = [
    {
      path: '/',
      exact: true,
      isPrivate: true,
      component: () => <Dashboard />,
      hasNavbar: true,
      hasFooter: true,
    },
    {
      path: '/signin',
      exact: true,
      isPrivate: false,
      component: () => <LoginView />,
    },
    {
      path: '/signup',
      exact: true,
      isPrivate: false,
      component: () => <SignupView />,
    },
    // {
    //   path: '/terms-of-use',
    //   exact: true,
    //   isPrivate: true,
    //   component: () => <TermsView />,
    //   hasNavbar: true,
    //   hasFooter: true,
    // },
    // {
    //   path: '/privacy-policy',
    //   exact: true,
    //   isPrivate: true,
    //   component: () => <PrivacyView />,
    //   hasNavbar: true,
    //   hasFooter: true,
    // },
    // {
    //   path: '/contact-us',
    //   exact: true,
    //   isPrivate: true,
    //   component: () => <ContactView />,
    //   hasNavbar: true,
    //   hasFooter: true,
    // },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routesArr.map((route) => (
          <RouteWrapper
            key={route.path}
            path={route.path}
            exact={route.exact}
            isPrivate={route.isPrivate}
            Component={route.component}
            hasNavbar={route.hasNavbar}
            hasFooter={route.hasFooter}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default memo(Routes2);
