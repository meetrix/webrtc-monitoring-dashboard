import React from 'react';
import { Button, ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import { Variant } from '../types';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
      '& .MuiButton-contained': {
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
          // color: theme.palette.primary.contrastText,
        },
      },
      '& .Mui-disabled': {
        borderColor: theme.palette.secondary.light,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.disabled,
      },
    },
    button: {
      borderWidth: 1,
      // borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
      textTransform: 'capitalize',
      fontSize: theme.typography.body2.fontSize,
      letterSpacing: 1.25,
      boxShadow: 'none',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
        width: '100%',
      },
    },
    icon: {
      height: theme.typography.body2.fontSize,
      color: theme.palette.primary.contrastText,
      // marginRight: 4,
    },
  });
};

export interface ButtonComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  label?: string;
  icon?: React.ReactNode;
  href?: string;
  download?: any;
  disabled?: boolean;
  customStyles?: any;
  variant?: Variant;
}

export const IconButton: React.FC<ButtonComponentProps> = ({
  classes,
  onClick,
  id,
  label,
  icon,
  href,
  download,
  disabled = false,
  variant = 'outlined',
  customStyles,
  ...otherProps
}: ButtonComponentProps) => {
  return (
    <span className={clsx(classes.root, customStyles && customStyles)}>
      <Button
        className={clsx(classes.button, 'custom-style-icon-button')}
        onClick={onClick}
        id={id}
        href={href}
        color="primary"
        disabled={disabled}
        {...otherProps}
        startIcon={icon}
        variant={variant}
      >
        {label}
      </Button>
    </span>
  );
};

export default withStyles(styles)(IconButton);
