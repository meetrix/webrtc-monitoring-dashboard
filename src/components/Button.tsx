import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Theme } from '@mui/material';
import { withStyles, createStyles, WithStyles } from '@mui/styles';

type Color = 'primary' | 'secondary';

const styles = (theme: Theme) => {
  // let { main, dark } = theme.palette.primary;
  return createStyles({
    root: {
      boxShadow: '0px 5px 10px #4285F54E',
      color: '#fff',
      fontWeight: 'bold',
      background: theme.palette.primary.main,
      opacity: 1,
      // background: ({ color }: { color: Color }) => {
      //   if (color) {
      //     const _main = theme?.palette[color]?.main;
      //     const _dark = theme?.palette[color]?.dark;
      //     if (_main && _dark) {
      //       main = theme.palette[color].main;
      //       dark = theme.palette[color].dark;
      //     } else if (typeof color === 'string') {
      //       return color;
      //     }
      //   }
      //   return `transparent linear-gradient(98deg, ${main} 0%, ${dark} 100%) 0% 0% no-repeat padding-box`;
      // },
      '&:hover': {
        // background: '#186eff',
        background: theme.palette.primary.main,
        opacity: 0.9,
      },
    },
    fullWidth: {
      width: '100%',
    },
  });
};

export interface ButtonComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  fullWidth?: boolean;
  color?: Color;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  classes,
  onClick,
  label,
  fullWidth = false,
  ...otherProps
}: ButtonComponentProps) => {
  return (
    <Button
      className={clsx(classes.root, fullWidth && classes.fullWidth)}
      onClick={onClick}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default withStyles(styles)(ButtonComponent);
