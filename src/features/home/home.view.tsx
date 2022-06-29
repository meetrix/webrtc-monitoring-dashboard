/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import styles from './home.styles';

export type IHomeView = WithStyles<typeof styles>;

const Home: React.FC<IHomeView> = ({ classes }: IHomeView) => {
  return (
    <div className={classes.root}>
      <div className={classes.titleText}>Home</div>
    </div>
  );
};

export default withStyles(styles)(Home);
