import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    formHeading: {
      marginBottom: '2vh',
      fontSize: '1.8rem',
      fontWeight: 'bolder',
    },
    buttonWrapper: {
      marginTop: '1vh',
      '& .MuiButton-contained.Mui-disabled': {
        backgroundColor: '#E3F2FF',
        color: '#2485F6',
      },
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
