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
    topPaper: {
      padding: 10,
      marginBottom: '2vh',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
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
