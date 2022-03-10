import React, { memo } from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { Alignment, Variant } from '../types';

type Color = 'primary' | 'secondary';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      '& .MuiButton-contained': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark,
        },
      },
      '& .MuiButton-outlined': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        borderWidth: 1,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.light,
        },
        '&:focus': {
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiSvgIcon-root': {
        height: theme.typography.body1.fontSize,
        width: theme.typography.body1.fontSize,
        marginRight: 7,
      },
      '& .Mui-disabled': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.disabled,
      },
    },
    button: {
      textTransform: 'capitalize',
      fontSize: theme.typography.body2.fontSize,
      padding: '10px 16px',
      lineHeight: '13px',
      letterSpacing: 1,
      boxShadow: 'none',
      borderRadius: 3,
      height: '100%',
    },
    margin: {
      margin: theme.spacing(1),
    },
    alignRight: {
      textAlign: 'right',
    },
    alignCenter: {
      textAlign: 'center',
    },
    round: {
      borderRadius: 1000,
    },
  });
};

export interface ButtonComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  label?: string;
  fullWidth?: boolean;
  color?: Color;
  variant?: Variant;
  roundBorder?: boolean;
  disabled?: boolean;
  customStyles?: string;
  align?: Alignment;
}

export const BasicButton: React.FC<ButtonComponentProps> = ({
  classes,
  onClick,
  id,
  label = 'Test Button',
  fullWidth = false,
  roundBorder = false,
  disabled = false,
  align = 'left',
  variant = 'outlined',
  customStyles,
  ...otherProps
}: ButtonComponentProps) => {
  return (
    <div
      className={clsx(
        classes.root,
        'basic-button-wrapper',
        align === 'center' && classes.alignCenter,
        align === 'right' && classes.alignRight,
        customStyles
      )}
    >
      <Button
        className={clsx(
          classes.button,
          roundBorder && classes.round,
          'basic-button-class'
        )}
        onClick={onClick}
        id={id}
        disabled={disabled}
        fullWidth={fullWidth}
        variant={variant}
        {...otherProps}
      >
        {label}
      </Button>
    </div>
  );
};

export default memo(withStyles(styles)(BasicButton));
