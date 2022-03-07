import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import backgrounImage from '../../assets/login/forgotpassword_background.png';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
      backgroundImage: `url(${backgrounImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      objectFit: 'fill',
      backgroundAttachment: 'fixed',
      width: '100vw',
      height: 'inherit',
      '@media only screen and (max-width: 575px)': {
        objectFit: 'cover',
        width: '100%',
      },
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      // borderRadius: 5,
      boxShadow: 'none',
      justifyContent: 'center',
    },
    formHeading: {
      marginBottom: 30,
      color: '#000000',
      fontSize: '1.8rem',
      fontFamily: 'Poppins',
      fontWeight: 'bolder',
      justifyContent: 'center',
      textAlign: 'center',
    },
    redButton: {
      marginTop: '3%',
      '& .MuiButton-contained.Mui-disabled': {
        backgroundColor: '#f46775',
        color: '#ffffffb5',
      },
    },
    paper_main_div: {
      padding: '5vw',
      justifyContent: 'center',
    },
    textField: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'ceneter',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    errorText: {
      color: '#ff0033',
    },
    successText: {
      color: '#4F8A10',
    },
  });
};

export default styles;
