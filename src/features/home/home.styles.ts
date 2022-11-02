import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 8vh)',
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
    },
    bottomPaper: {
      padding: 20,
    },
    tableContainer: {
      marginTop: '2vh',
      overflow: 'auto',
      maxHeight: '40vh',
    },
  });
};

export default styles;
