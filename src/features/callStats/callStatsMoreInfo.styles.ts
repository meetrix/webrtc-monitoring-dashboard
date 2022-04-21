import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 20px)',
    },
    bottomPaper: {
      flexGrow: 1,
      overflow: 'auto',
      marginTop: '1vh',
    },
    grayText: {
      color: theme.palette.secondary.main,
    },
  });
};

export default styles;
