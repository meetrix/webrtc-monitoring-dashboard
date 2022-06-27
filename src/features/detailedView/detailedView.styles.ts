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
        fontWeight: 530,
      },
      '& .MuiSvgIcon-root': {
        fontSize: theme.typography.body1.fontSize,
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
    selectedRowCel: {
      color: '#4A74E9 !important',
    },
    selectedRow: {
      backgroundColor: '#EDF1FD !important',
    },
    tableRow: {
      '&.MuiTableRow-root:hover': {
        backgroundColor: 'transparent',
      },
    },
  });
};

export default styles;
