import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    forgotText: {
      color: 'black',
      fontSize: '2em',
      fontWeight: 'bold',
      marginBottom: '2vh',
      // '@media only screen and (max-width: 575px)': {
      //   fontSize: '2.125rem',
      // },
    },
    longText: {
      color: '#656565',
      fontSize: '1rem',
      fontWeight: 300,
      marginBottom: '2vh',
      // '@media only screen and (max-width: 575px)': {
      //   marginBottom: '3vh',
      // },
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
      },
    },
    buttonWrapper: {
      marginTop: '2vh',
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
