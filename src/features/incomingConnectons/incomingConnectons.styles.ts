import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 20px)',
    },
    topPaper: {
      padding: 10,
      marginBottom: '2vh',
    },
    inputWrapper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    bottomPaper: {
      flexGrow: 1,
      overflow: 'auto',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.secondary.light,
      marginTop: '1vh',
    },
    tokenRoot: {
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderBottom: '0px',
      borderColor: theme.palette.secondary.light,
    },
    tokenTitleWrapper: {
      flexGrow: 1,
    },
    moreButton: {
      margin: theme.spacing(0, 2),
    },
    grayText: {
      color: theme.palette.secondary.main,
    },
  });
};

export default styles;
