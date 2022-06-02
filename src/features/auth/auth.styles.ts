import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
    },
    buttonMargin: {
      marginTop: '5vh',
    },
    link: {
      textDecoration: 'none',
      color: '#2485F6',
    },
    forgotPasswordWrapper: {
      position: 'absolute',
      bottom: '3vh',
      left: 0,
      width: '100%',
      textAlign: 'center',
    },
    forgotPassword: {
      textDecoration: 'none',
      color: '#707070',
    },
  });
};

export default styles;