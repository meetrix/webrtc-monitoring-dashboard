import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      padding: '5vh 2vw 3vh 4vw',
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
        maxHeight: 'calc(85vh - 100px)',
        overflow: 'auto',
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
    // selectedRowCel: {
    //   color: '#4A74E9 !important',
    // },
    // selectedRow: {
    //   backgroundColor: '#EDF1FD !important',
    // },
    // tableRow: {
    //   '&.MuiTableRow-root:hover': {
    //     backgroundColor: 'transparent',
    //   },
    // },
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
  });
};

export default styles;
