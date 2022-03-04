import React from 'react';
import { withStyles } from '@mui/styles';
import { LinearProgress as Progress, LinearProgressProps } from '@mui/material';
// import propTypes from 'prop-types';

const LinearProgress = (props: any) => {
  const { classes } = props;
  return (
    <Progress
      {...props}
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
    />
  );
};

// LinearProgress.propTypes = {
//   classes: propTypes.shape().isRequired,
// };

const styles = {
  colorPrimary: {
    backgroundColor: '#e8eaf6',
  },
  barColorPrimary: {
    backgroundColor: '#03a9f4',
  },
};

export default withStyles(styles)(LinearProgress);
