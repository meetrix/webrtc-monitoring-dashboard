/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStatsMoreInfo.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Table from '../../components/Table';

type ICallStatsMoreInfoView = WithStyles<typeof styles>;

const CallStatsMoreInfo: React.FC<ICallStatsMoreInfoView> = ({
  classes,
}: ICallStatsMoreInfoView) => {
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="GrayText">
        More data
      </Typography>
    </div>
  );
};

export default memo(withStyles(styles)(CallStatsMoreInfo));
