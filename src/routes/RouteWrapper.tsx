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

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundColor: theme.palette.secondary.light,
      '& .max-width-responsive': {
        maxWidth: 2500, // set max-width for all layouts
      },
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
    },
    bodyWrapper: {
      height: 'calc(100vh - 64px - 35px - 4vh)', // fullwidth - navbar - footer - bodyPadding-TopBottom
      maxWidth: '100vw',
      padding: '2vh 3vw',
      display: 'flex',
      justifyContent: 'center',
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
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100vw',
    },
  });
};
interface IRouteWrapper extends WithStyles<OutlinedInputProps & typeof styles> {
  component: any;
  // path: string;
  //   hasLoader: boolean;
  isPrivate: boolean;
  hasNavbar?: boolean;
  hasFooter?: boolean;
}

const RouteWrapper = ({
  classes,
  component,
  // path,
  isPrivate = false,
  //   hasLoader = false,
  hasNavbar = false,
  hasFooter = false,
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
          hasNavbar && hasFooter
            ? classes.bodyWrapper
            : classes.fullScreenBodyWrapper
        }
      >
        <div className={clsx(classes.maxWidth, 'max-width-responsive')}>
          {component}
        </div>
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

RouteWrapper.defaultProps = {
  hasNavbar: false,
  hasFooter: false,
};

export default memo(withStyles(styles)(RouteWrapper));
