import React from 'react';
import { TypographyProps, Theme, Typography } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { TypographyColor } from '../types';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(1),
    },
  });
};

export interface TypographyComponentProps
  extends WithStyles<TypographyProps & typeof styles> {
  children: React.ReactNode;
  variant: any;
  component?: any;
  className?: string;
  color?: TypographyColor | string;
  sx?: any;
}

export const TypographyComponent: React.FC<TypographyComponentProps> = ({
  classes,
  children,
  variant,
  component,
  className,
  color,
  ...otherProps
}: TypographyComponentProps) => {
  return (
    <Typography
      variant={variant}
      component={component}
      className={className}
      color={color}
      {...otherProps}
    >
      {children}
    </Typography>
  );
};

export default withStyles(styles)(TypographyComponent);
