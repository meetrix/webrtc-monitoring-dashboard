import React, { memo } from 'react';
import { Grid, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import { Typography } from '../../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      maxHeight: 35,
      paddingLeft: '3vw',
      paddingRight: '3vw',
      color: theme.palette.secondary.dark,
      display: 'flex',
      justifyContent: 'center',
    },
    footerWrapper: {
      width: '100%',
      display: 'flex',
    },
    containerLeft: {
      flexGrow: 1,
    },
    containerRight: {
      '& a': {
        textDecoration: 'none',
        marginLeft: '1vw',
        color: theme.palette.secondary.dark,
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
      },
    },
    blueLink: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  });
};

export type IFooterProps = WithStyles<typeof styles>;

const Footer = ({ classes }: IFooterProps) => {
  return (
    <Grid className={classes.root}>
      <div
        className={clsx(
          classes.footerWrapper
          // 'max-width-responsive'
        )}
      >
        <div className={classes.containerLeft}>
          <Typography variant="body2">
            <a href="/" className={classes.blueLink}>
              Learn more
            </a>
            &nbsp; about meetrix meet
          </Typography>
        </div>
        <div className={classes.containerRight}>
          <Typography variant="body2" color="secondary">
            {/* <a href="/">Feedbacks</a> */}
            <a href="/contact-us" id="contact-us">
              Contact us
            </a>
            <a href="/terms-of-use" id="terms-of-use">
              Terms of use
            </a>
            <a href="/privacy-policy" id="privacy-policy">
              Privacy Policy
            </a>
          </Typography>
        </div>
      </div>
    </Grid>
  );
};

export default memo(withStyles(styles)(Footer));
