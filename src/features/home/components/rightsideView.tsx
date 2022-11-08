/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { createStyles, makeStyles, WithStyles, withStyles } from '@mui/styles';

import { Paper } from '@mui/material';

import styles from '../home.styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: '2vw',
    },
  })
);

const RightsideView = () => {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.root}>
      Details...
    </Paper>
  );
};

export default withStyles(styles)(RightsideView);
