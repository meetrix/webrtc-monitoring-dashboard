import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
      padding: '5vh 2vw 3vh 4vw',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100% - 8vh)',
    },
    topPaper: {
      padding: 20,
      marginBottom: '2vh',
    },
    inputWrapper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    link: {
      color: '#2D88F3',
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 500,
    },
    // bottomPaper: {
    //   flexGrow: 1,
    //   overflow: 'auto',
    //   borderBottom: '1px solid',
    //   borderBottomColor: theme.palette.secondary.light,
    //   marginTop: '1vh',
    // },
    tokenRoot: {
      paddingTop: 10,
      display: 'flex',
      alignItems: 'center',
      // border: '1px solid',
      // borderBottom: '0px',
      // borderColor: theme.palette.secondary.light,
    },
    tokenTitleWrapper: {
      flexGrow: 1,
    },
    moreButton: {
      margin: theme.spacing(0, 2),
      '& .MuiButton-outlined': {
        border: '1px solid #DAE3FA',
        color: '#5F5F5F',
        padding: '6px 20px',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: '#DAE3FA',
          color: theme.palette.primary.main,
        },
        '&:focus': {
          backgroundColor: 'transparent',
          borderColor: '#DAE3FA',
        },
      },
    },
    grayText: {
      color: theme.palette.secondary.main,
    },
    titleText: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
      marginBottom: '20px',
      fontWeight: 500,
    },
    token: {
      fontSize: theme.typography.h6.fontSize,
      color: '#5F5F5F',

      fontWeight: 500,
    },
    divider: {
      borderColor: '#DAE3FA',
      marginTop: '15px',
    },
    paperTextDark: {
      fontSize: theme.typography.body2.fontSize,
      color: '#5F5F5F',
      fontWeight: 500,
    },
    textField: {
      color: '#5f5f5f8a',
      fontSize: theme.typography.body2.fontSize,
      '& .MuiOutlinedInput-input': {
        fontSize: theme.typography.body2.fontSize,
        color: '#5f5f5f8a',
        padding: '5px 7px !important',
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
    paperTextLight: {
      color: '#5f5f5f8a',
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 500,
    },
    infoIcon: {
      color: '#4A74E9',
      paddingRight: '12px',
    },
    info: {
      paddingTop: '10px',
      display: 'flex',
    },
    tokenGenerateButton: {
      height: 'auto',
    },
    copyIcon: {
      fontSize: '12px',
      color: '#5F5F5F',
      paddingLeft: '2px',
    },
    tokenList: {
      overflow: 'auto',
      maxHeight: 'calc(92vh - 371px)',
    },
  });
};

export default styles;
