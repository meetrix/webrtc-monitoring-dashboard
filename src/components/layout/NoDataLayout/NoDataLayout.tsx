import React, { memo } from 'react';
import { DialogProps, Grid, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import clsx from 'clsx';
import { Typography } from '../../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    image: {
      marginBottom: '3vh',
      maxWidth: '15%',
    },
    heading: {
      marginBottom: '2vh',
    },
    headingTypeTwo: {
      marginBottom: '2vh',
      width: '65%',
      textAlign: 'center',
    },
    description: {
      marginBottom: '2vh',
    },
    buttonWrapper: {
      marginTop: '2vh',
    },
  });
};

export interface INoDataLayoutProps
  extends WithStyles<DialogProps & typeof styles> {
  image?: string;
  heading?: string;
  headingTypeTwo?: string;
  description?: string;
  children?: React.ReactNode;
  customStyles?: any;
}

const NoDataLayout = ({
  classes,
  image,
  heading,
  headingTypeTwo,
  description,
  children,
  customStyles,
}: INoDataLayoutProps) => {
  return (
    <Grid className={clsx(classes.root, customStyles && customStyles)}>
      <img className={classes.image} src={image} alt="" />
      {heading && (
        <Typography variant="h4" color="secondary" className={classes.heading}>
          {heading}
        </Typography>
      )}
      {headingTypeTwo && (
        <Typography
          variant="h5"
          color="secondary"
          className={classes.headingTypeTwo}
        >
          {headingTypeTwo}
        </Typography>
      )}
      {description && (
        <Typography
          variant="body1"
          color="secondary"
          className={classes.description}
        >
          {description}
        </Typography>
      )}
      <div className={classes.buttonWrapper}>{children}</div>
    </Grid>
  );
};

export default memo(withStyles(styles)(NoDataLayout));
