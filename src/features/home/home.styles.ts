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
    datePicker: {
      margin: '3vh 0 0',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      '& .MuiOutlinedInput-input': {
        padding: '6px 14px',
      },
    },
    tableContainer: {
      marginTop: '2vh',
      overflow: 'auto',
      flexGrow: 1,
      '& 	.MuiDataGrid-row': {
        cursor: 'pointer',
      },
      '& .fault-status-1': {
        backgroundColor: '#ffbcbc',
      },
    },
  });
};

export default styles;
