import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
      // backgroundImage: `url(${backgrounImage})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      height: '100vh',
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
      padding: '3vw 5vw',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      // borderRadius: 5,
      boxShadow: 'none',
      justifyContent: 'center',
    },
    grid: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      top: '0.3125rem',
      left: 0,
      right: 0,
      bottom: 0,
    },
    mainDiv: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainBackground: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      height: '20%',
    },
    forgotText: {
      color: 'black',
      fontSize: '2em',
      fontFamily: 'Poppins !important',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1em',
      // '@media only screen and (max-width: 575px)': {
      //   fontSize: '2.125rem',
      // },
    },
    longText: {
      color: '#656565',
      fontSize: '1rem',
      fontFamily: 'Poppins !important',
      textAlign: 'center',
      fontWeight: 'lighter',
      marginBottom: '5vh',
      '@media only screen and (max-width: 575px)': {
        marginBottom: '3vh',
      },
    },
    statusWrapper: {
      color: '#ff0033',
      fontSize: '.9em',
      fontFamily: 'Poppins !important',
      textAlign: 'center',
      fontWeight: 'lighter',
      marginBottom: '2rem',
      '@media only screen and (max-width: 575px)': {
        // marginBottom: '2rem',
        fontSize: '1em',
      },
    },
    errorText: {
      color: '#ff0033',
    },
    successText: {
      color: '#4F8A10',
    },
    responseText: {
      marginBottom: '1.5rem',
    },
    textField: {
      width: '100%',
      textAlign: 'center',
      '& .makeStyles-text-13': {
        width: '100%',
      },
      '@media only screen and (max-width: 575px)': {
        display: 'grid',
        // paddingLeft: '1.75rem',
        // paddingRight: '0.625rem',
      },
    },
    redButton: {
      marginTop: '4%',
      marginBottom: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      // width: '40%',
      display: 'flex',
      // marginLeft: '27%',
      '& .MuiButton-contained.Mui-disabled': {
        backgroundColor: '#f46775',
        color: '#ffffffb5',
      },
    },
    alertLink: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#E74F5F',
      outline: 'none',
    },
  });
};

export default styles;
