import React, { memo } from 'react';
import { Grid, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      maxHeight: 35,
      paddingLeft: '3vw',
      paddingRight: '3vw',
      color: theme.palette.secondary.dark,
      display: 'flex',
      justifyContent: 'center',
    },
  });
};

export type IGeneralLogsProps = WithStyles<typeof styles>;

const GeneralLogs = ({ classes }: IGeneralLogsProps) => {
  return <Grid className={classes.root}>test</Grid>;
};

export default memo(withStyles(styles)(GeneralLogs));
