/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './incomingConnectons.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
// import {
//   IncommingConnectionsAsync,
//   selectIncommingConnections,
// } from './incomingConnectons.slice';

type IIncommingConnectionsView = WithStyles<typeof styles>;

const SampleData = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

const SampleToken = 'BZ0HaDRtDHL0Q7kiX3dYJEpN6KJOLPN';

const IncommingConnections: React.FC<IIncommingConnectionsView> = ({
  classes,
}: IIncommingConnectionsView) => {
  const TokenComponent = () => {
    return (
      <div className={classes.tokenRoot}>
        <div className={classes.tokenTitleWrapper}>
          <Typography variant="body2" fontWeight={600}>
            Meetrix.io
          </Typography>
          <Typography variant="body2" className={classes.grayText}>
            {SampleToken}
          </Typography>
        </div>
        <Typography variant="body2" className={classes.grayText}>
          02/02/2022
        </Typography>
        <Button
          id="token-more-button"
          label="More"
          customStyles={classes.moreButton}
        />
        <Button
          id="token-copy"
          label="Copy to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(SampleToken);
          }}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography component="h3">Generate your token</Typography>
        <Grid container spacing={2} className={classes.inputWrapper}>
          <Grid item sm={12} lg={9}>
            <TextField label="Enter your website link here" />
          </Grid>
          <Grid item sm={12} lg={3}>
            <Button
              id="generate-token"
              label="Generate your token"
              variant="contained"
              fullWidth
            />
          </Grid>
        </Grid>
        <Link to="/" className={classes.link}>
          Learn more
        </Link>
      </Paper>
      <Typography variant="body2" color="GrayText">
        TOKENS
      </Typography>
      <Paper elevation={0} className={classes.bottomPaper}>
        {SampleData.map(() => TokenComponent())}
      </Paper>
    </div>
  );
};

export default memo(withStyles(styles)(IncommingConnections));
