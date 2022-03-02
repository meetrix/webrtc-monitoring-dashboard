import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: theme.palette.common.white,
    },
    leftGrid: {
      backgroundColor: theme.palette.common.black,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.down('xs')]: {
        padding: '6vw',
        '& h3': {
          fontSize: '1.7rem',
        },
        '& h4': {
          fontSize: '1rem',
        },
      },
    },
    rightGrid: {
      display: 'grid',
      placeItems: 'center',
      [theme.breakpoints.down('xs')]: {
        padding: '6vw',
      },
    },
    formWrapper: {
      padding: '5%',
    },
    logo: {
      width: 'clamp(40px, 15%, 60px)',
      marginBottom: theme.spacing(2),
    },
    heading: {
      fontWeight: 600,
    },
    subHeading: {
      margin: '3vh 0 2vh',
      color: theme.palette.text.secondary,
    },
    buttonWrapper: {
      textAlign: 'right',
    },
    buttonMargin: {
      marginTop: '5vh',
    },
  });
};

export default styles;
