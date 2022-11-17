import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'auto',
    },
    titleText: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
      marginBottom: '20px',
      fontWeight: 500,
    },
    topPaper: {
      padding: 20,
      marginBottom: '2vh',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    tableContainer: {
      marginTop: '2vh',
      overflow: 'auto',
      flexGrow: 1,
      '& 	.MuiDataGrid-row': {
        cursor: 'pointer',
      },
    },
    selectForm: {
      width: '100%',
      // height: '56px',
      margin: theme.spacing(2, 0),
      '& .MuiOutlinedInput-input': {
        padding: '10px 0.5rem !important',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.dark,
      },
      '& .MuiInputLabel-outlined': {
        transform: 'translate(14px, 10px) scale(1)',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
        backgroundColor: theme.palette.common.white,
        padding: '0 5px',
      },
    },
    select: {
      '& em': {
        fontStyle: 'unset !important',
      },
    },
  });
};

export default styles;
