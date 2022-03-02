import React, { memo } from 'react';
import { Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    container: {},
  });
};

export interface IMainLayoutProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

const MainLayout = ({ classes, children }: IMainLayoutProps) => {
  return <div className={classes.container}>{children}</div>;
};

export default memo(withStyles(styles)(MainLayout));
