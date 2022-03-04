import React from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress as Progress } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    left: 5,
    '& > * + *': {
      //  marginLeft: theme.spacing(2),
    },
  },
}));

const CircularProgress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Progress color="warning" size={15} />
    </div>
  );
};

export default CircularProgress;
