import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      overflow: 'auto',
    },
  });
};

export default styles;
