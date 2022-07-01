import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { OutlinedInputProps, Theme } from '@mui/material';

import clsx from 'clsx';
import { Footer } from '../components/layout';
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/auth.slice';
import { AppBar } from '../features/appBar';
import { getToken } from '../helper/localStorage';
import Sidebar from '../components/layout/Sidbar';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundColor: theme.palette.secondary.light,
      display: 'flex',
      flexDirection: 'column',
      // '& .max-width-responsive': {
      //   maxWidth: 2500, // set max-width for all layouts
      // },
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
    },
    bodyWrapper: {
      // height: 'calc(100vh - 64px - 35px - 4vh)', // fullwidth - navbar - footer - bodyPadding-TopBottom
      width: '100%',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
        minHeight: '96vh',
      },
    },
    maxWidth: {
      display: 'flex',
      width: '100%',
    },
    fullScreenBodyWrapper: {
      // height: '100%',
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100vw',
    },
    sidbarView: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
    },
    bodyWithSidebar: {
      flexGrow: 1,
      overflow: 'hidden',
      backgroundColor: '#FAFCFF',
      borderStartStartRadius: '5px',
      padding: '2vw',
    },
  });
};
interface IRouteWrapper extends WithStyles<OutlinedInputProps & typeof styles> {
  component: any;
  // path: string;
  //   hasLoader: boolean;
  isPrivate: boolean;
  hasNavbar?: boolean;
  hasSidebar?: boolean;
  hasFooter?: boolean;
}

const RouteWrapper = ({
  classes,
  component,
  // path,
  isPrivate = false,
  //   hasLoader = false,
  hasNavbar,
  hasSidebar,
  hasFooter,
  ...rest
}: IRouteWrapper) => {
  const { isAuthenticated, loading } = useAppSelector(selectAuth);

  const token = getToken();

  if (!loading && !token && isPrivate && !isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // if (!isPrivate && isAuthenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className={classes.root}>
      {hasNavbar && <AppBar />}
      <div
        className={
          hasNavbar || hasFooter
            ? classes.bodyWrapper
            : classes.fullScreenBodyWrapper
        }
      >
        <div
          className={clsx(
            classes.maxWidth,
            // 'max-width-responsive',
            hasSidebar && classes.sidbarView
          )}
        >
          {hasSidebar && <Sidebar />}
          <div className={clsx(hasSidebar && classes.bodyWithSidebar)}>
            {component}
          </div>
        </div>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

RouteWrapper.defaultProps = {
  hasNavbar: false,
  hasSidebar: false,
  hasFooter: false,
};

export default memo(withStyles(styles)(RouteWrapper));
