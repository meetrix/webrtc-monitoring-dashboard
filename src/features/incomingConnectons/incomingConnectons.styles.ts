import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
      padding: 10,
    },
    paper: {
      padding: 10,
    },
    inputWrapper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  });
};

export default styles;
