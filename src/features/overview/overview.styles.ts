import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      overflow: 'auto',
    },
    pathText: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.primary.main,
      marginBottom: '20px',
      fontWeight: 500,
    },
    datePicker: {
      '& .MuiOutlinedInput-input': {
        padding: '2px 8px',
        fontSize: theme.typography.body2.fontSize,
        width: '90px',
        color: '#5F5F5F',
        fontWeight: 500,
      },
      '& .MuiInputBase-root': {
        border: '1px solid #DAE3FA',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
        color: theme.palette.primary.main,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  });
};

export default styles;
