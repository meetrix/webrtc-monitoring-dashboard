import React, { memo } from 'react';
import { Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { Typography } from '../../Typography';
import { ClockIcon } from '../../../assets/icons';

const styles = (theme: Theme) => {
  return createStyles({
    container: {
      zIndex: 2000,
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    image: {},
  });
};

export interface ILoadingView extends WithStyles<typeof styles> {
  children?: React.ReactNode;
}

const LoadingView = ({ classes }: ILoadingView) => {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={ClockIcon} alt="loading" />
      <Typography variant="h5" component="p" color="primary">
        Loading...
      </Typography>
    </div>
  );
};

export default memo(withStyles(styles)(LoadingView));
