import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 8vh)',
    },
    titleText: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.primary.main,
      marginBottom: '20px',
      fontWeight: 500,
    },
    paper: {
      boxShadow: 'none',
      marginTop: '10px',
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
    tableCells: {
      '& .MuiTableCell-root': {
        fontSize: '0.8rem',
        color: '#5F5F5F',
        fontWeight: 500,
      },
      '& .MuiSvgIcon-root': {
        fontSize: theme.typography.body1.fontSize,
      },
      '&.MuiTableContainer-root': {
        width: 'auto',
        padding: '0px 20px',
        maxHeight: 'calc(83vh - 145px)',
        overflow: 'auto',
        '@media only screen and (max-width: 1024px)': {
          maxHeight: 'calc(80vh - 145px)',
        },
      },
    },
    tickIcon: {
      color: '#5FCCC8',
    },
    crossIcon: {
      color: '#EB5149',
    },
    sortIcon: {
      '& .MuiTableSortLabel-icon': {
        fontSize: '0px',
        cursor: 'none',
      },
    },
    sortDropdown: {
      display: 'flex',
      height: '25px',
      width: '10rem',
      marginRight: '10px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DAE3FA',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DAE3FA',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DAE3FA',
      },
      '& .MuiSvgIcon-root': {
        color: '#4A74E9',
      },
    },
    paperTextDark: {
      fontSize: theme.typography.body2.fontSize,
      color: '#5F5F5F',
      fontWeight: 500,
    },
    dropdown: {
      boxShadow: 'none',
      border: '1px solid #DAE3FA',
    },
    iconButton: {
      '&.MuiIconButton-root': {
        padding: '0px',
        color: '#4A74E9',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem',
      },
    },
    tooltip: {
      background: theme.palette.secondary.light,
      marginTop: '10px !important',
      color: theme.palette.primary.main,
      border: '1px solid #DAE3FA',
    },
    paginationIcons: {
      display: 'flex',
      justifyContent: 'right',
      border: 'none',
      '& .MuiIconButton-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiIconButton-root.Mui-disabled': {
        color: '#00000061',
      },
      '& .MuiTablePagination-select': {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.primary.main,
        fontWeight: 500,
        border: '1px solid #DAE3FA',
        borderRadius: '2px',
      },
      '& .MuiSvgIcon-root.MuiSelect-icon': {
        color: theme.palette.primary.main,
      },
    },
    datePickerWrapper: {
      display: 'flex',
      zIndex: 100,
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
    textField: {
      width: '13rem',
      '& .MuiOutlinedInput-input': {
        fontSize: theme.typography.body2.fontSize,
        color: '#5F5F5F',
        padding: '2px 8px !important',
        fontWeight: 500,
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DAE3FA',
      },
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#DAE3FA',
      },
      '&:hover': {
        borderColor: '#DAE3FA !important',
      },
    },
    gridItem: {
      marginBottom: '10px',
    },
    refreshButton: {
      marginRight: 15,
      opacity: 0.8,
      '& .MuiButton-root': {
        padding: '4px 16px',
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
