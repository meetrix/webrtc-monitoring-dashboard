import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Theme } from '@mui/material';
import { withStyles, createStyles, WithStyles } from '@mui/styles';

type Color = 'primary' | 'secondary';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

export interface ButtonComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  fullWidth?: boolean;
  color?: Color;
  variant?: 'text' | 'contained' | 'outlined';
  disableRipple?: boolean;
  disableFocusRipple?: boolean;
  customStyles?: any;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  classes,
  label,
  customStyles,
  ...otherProps
}: ButtonComponentProps) => {
  return (
    <Button className={clsx(classes.root, customStyles)} {...otherProps}>
      {label}
    </Button>
  );
};

export default withStyles(styles)(ButtonComponent);
