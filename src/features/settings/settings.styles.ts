import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      // width: '100%',
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
    tokenRoot: {
      paddingTop: 10,
      display: 'flex',
      alignItems: 'center',
    },
    tokenTitleWrapper: {
      marginRight: '7rem',
      '@media only screen and (max-width: 1024px)': {
        marginRight: '5rem',
      },
    },
    tokenItemButton: {
      margin: theme.spacing(0, 2),
      '& .MuiButton-outlined': {
        border: '1px solid #DAE3FA',
        color: '#5F5F5F',
        padding: '6px 35px',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: '#DAE3FA',
          color: theme.palette.primary.main,
        },
        '&:focus': {
          backgroundColor: 'transparent',
          borderColor: '#DAE3FA',
        },
        '@media only screen and (max-width: 1280px)': {
          padding: '6px 20px',
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
      padding: '0px 0px 4px 2px',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        fontSize: '12px',
      },
      '& .MuiTouchRipple-root': {
        top: '-2px',
        left: '-2px',
        padding: '10px',
      },
    },
    tokenList: {
      overflow: 'auto',
      maxHeight: 'calc(92vh - 371px)',
      '@media only screen and (max-width: 1024px)': {
        maxHeight: 'calc(83vh - 371px)',
      },
    },
    configTypesDropdown: {
      display: 'flex',
      height: '25px',
      marginRight: '100px',
      width: '24rem',
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
    textFieldWidth: {
      width: '24rem',
    },
    settingsSaveButton: {
      height: 'auto',
      width: '24rem',
      paddingTop: '10px',
    },
    passwordTextField: {
      width: '24rem !important',
      margin: '0px',
      '& .MuiSvgIcon-root': {
        color: '#4A74E9',
        fontSize: theme.typography.body1.fontSize,
      },
    },
    alert: {
      display: 'flex',
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      '& .inputWrapper': {
        margin: 0,
      },
    },
    tooltip: {
      background: theme.palette.secondary.light,
      marginTop: '1px !important',
      color: theme.palette.primary.main,
      border: '1px solid #DAE3FA',
      padding: '7px',
    },
  });
};

export default styles;
