import React from 'react';
import { Button, ButtonProps, Theme, Typography } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
// import FacebookIcon from '@mui/icons/Facebook';
// import FacebookIcon from '../../assets/Login/Facebook.png';
// import GoogleIcon from '../../assets/Login/google.png';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(1),
      border: '1px solid #0000003b',
      // borderColor: theme.palette.secondary.main,
      textTransform: 'capitalize',
      padding: '6px 16px',
      width: '100%',
      '& .MuiButton-label': {
        position: 'relative',
      },
    },
    text: {
      // margin
    },
    iconWrapper: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      '& img': {
        height: '100%',
        position: 'absolute',
      },
    },
  });
};

export interface ButtonComponentProps
  extends WithStyles<ButtonProps & typeof styles> {
  onClick?: string;
  icon?: string;
  id?: string;
  text?: string;
}

export const SocialLoginButton: React.FC<ButtonComponentProps> = ({
  classes,
  id,
  onClick,
  icon,
  text,
  ...otherProps
}: ButtonComponentProps) => {
  return (
    <Button id={id} className={classes.root} href={onClick} {...otherProps}>
      <div className={classes.iconWrapper}>
        <img src={icon} alt="Social media icon" />
      </div>
      <Typography variant="body1" className={classes.text}>
        {text}
      </Typography>
    </Button>
  );
};

export default withStyles(styles)(SocialLoginButton);
