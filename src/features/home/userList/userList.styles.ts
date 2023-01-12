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
      flexGrow: 4,
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
      '& .fault-status-1': {
        backgroundColor: '#ffbcbc',
      },
    },
    refreshButton: {
      marginRight: 10,
      height: '70%',
      '& .MuiButton-root': {
        padding: '8px 16px',
        color: theme.palette.common.black,
        '&:hover': {
          backgroundColor: theme.palette.secondary.light,
          borderColor: theme.palette.secondary.light,
        },
      },
    },
  });
};

export default styles;
