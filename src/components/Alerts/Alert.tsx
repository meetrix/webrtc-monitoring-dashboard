import React, { useState, useEffect, memo } from 'react';
import { ButtonProps, Theme, Snackbar } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { Alert, AlertTitle } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { LabelPlacement, AlertTypes } from '../types';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
      marginTop: 10,
      '& .MuiSvgIcon-root': {
        width: theme.typography.h6.fontSize,
        height: theme.typography.h6.fontSize,
      },
      '& .MuiAlert-action': {
        alignItems: 'flex-start',
      },
      '& .MuiAlert-message': {
        textAlign: 'left',
      },
    },
    title: {
      textTransform: 'capitalize',
      fontWeight: 600,
      textAlign: 'start',
    },
  });
};

export interface AlertComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  labelPlacement?: LabelPlacement;
  id: string;
  children: React.ReactNode | string;
  type: AlertTypes;
  isOpen: boolean;
  handleClose: () => void;
}

export const AlertComponent: React.FC<AlertComponentProps> = ({
  classes,
  id,
  children = 'Sample massege',
  type = 'error',
  isOpen,
  handleClose,
}: AlertComponentProps) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      handleClose();
    }, 6000); // 6 sec

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={type}
        className={classes.root}
        id={id}
        // variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => handleClose()}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default memo(withStyles(styles)(AlertComponent));
