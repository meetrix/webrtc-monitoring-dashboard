import React from 'react';
import clsx from 'clsx';
import { ButtonProps, Theme, Typography } from '@mui/material';
import { withStyles, createStyles, WithStyles } from '@mui/styles';

import Paper from '@mui/material/Paper';
import Button from './Button';

const styles = (theme: Theme) => {
  // let { main, dark } = theme.palette.primary;
  return createStyles({
    root: {
      // boxShadow: '0px 5px 10px #4285F54E',
      width: 'clamp(280px, 15vw, 400px)',
      padding: 10,
    },
    title: {
      marginBottom: '20px !important',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    buttonWrapper: {
      width: '100%',
      textAlign: 'end',
    },
    button: {
      padding: '0 !important',
      textTransform: 'capitalize !important' as 'capitalize',
    },
  });
};

export interface PopupCardProps
  extends WithStyles<ButtonProps & typeof styles> {
  data: {
    status: string;
    items: {
      label: string;
      value: string;
    };
  };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SampleData = {
  status: 'Connected',
  data: [
    {
      label: 'Peer Connection',
      value: '8',
    },
    {
      label: 'Bytes Received',
      value: '10560 Kb',
    },
    {
      label: 'Bytes Sent',
      value: '10560 Kb',
    },
    {
      label: 'Jitter',
      value: '0',
    },
    {
      label: 'Packet Loss',
      value: '-',
    },
    {
      label: 'Local Ip',
      value: '123.456.789 1: 1:2345',
    },
    {
      label: 'Remote Ip',
      value: '123.456.789 1: 1:2345',
    },
  ],
};

export const PopupCard: React.FC<PopupCardProps> = ({
  classes,
  onClick,
  data,
  ...otherProps
}: PopupCardProps) => {
  return (
    <Paper className={clsx(classes.root)} elevation={3} square {...otherProps}>
      <Typography variant="body2" className={classes.title} fontWeight="bold">
        Connections
      </Typography>
      <div className={classes.item}>
        <Typography variant="body2">Status</Typography>
        <Typography
          variant="body2"
          color={SampleData.status === 'Connected' ? 'green' : 'red'}
        >
          {SampleData.status}
        </Typography>
      </div>
      {SampleData.data.map((item) => {
        return (
          <div className={classes.item}>
            <Typography variant="body2">{item.label}</Typography>
            <Typography variant="body2" color="GrayText">
              {item.value}
            </Typography>
          </div>
        );
      })}
      <div className={classes.buttonWrapper}>
        <Button
          label="View All"
          variant="text"
          customStyles={classes.button}
          disableRipple
          disableFocusRipple
        />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(PopupCard);
