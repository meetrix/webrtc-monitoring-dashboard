import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
    },
    leftWrapper: {
      paddingRight: '2vw',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    rightWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      height: 'calc(100% - 16px - 2vh)',
      paddingTop: '3vh',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
        textAlign: 'center',
      },
    },
    profileCard: {
      height: 'auto',
      marginBottom: '2vw',
      padding: '3vh 0',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    profilePicWrapper: {
      display: 'grid',
      placeItems: 'center',
    },
    avatar: {
      height: '15vh',
      width: '15vh',
      maxWidth: 170,
      maxHeight: 170,
    },
    profileDetailsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    profileName: {},
    profileTodayMeeting: {
      // marginBottom: '2vh',
      color: theme.palette.secondary.main,
    },
    profileStats: {
      marginTop: '2vh',
      color: theme.palette.secondary.main,
    },
    profileStatsList: {
      display: 'flex',
      '& p': {
        marginLeft: 10,
      },
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
    profileStatmargin: {
      marginBottom: '1vh',
    },
    leftBottom: {
      flexGrow: 1,
    },
    fullHeight: {
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
    },
    leftBottomRighWrapper: {
      paddingLeft: '2vw',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    recentMeetingsWrapper: {
      position: 'relative',
    },
    recentMeetingsTable: {
      position: 'absolute',
      width: '100%',
      top: theme.spacing(1),
      bottom: theme.spacing(1),
      overflow: 'auto',
    },
    upCommingMeeting: {
      flexGrow: 1,
      overflow: 'auto',
      width: '100%',
    },
    noUpComming: {
      backgroundColor: '#F9F9F9',
    },
    blueCard: {
      height: 'auto',
      padding: '1vw',
      color: theme.palette.primary.contrastText,
      marginBottom: '1vh',
      background: `linear-gradient(115deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
    },
    blueCardMeetingDetails: {
      marginTop: 5,
    },
    blueCardMeetingStatsItem: {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        marginLeft: 10,
      },
    },
    blueCardMeetingStatsIcon: {
      width: theme.typography.body2.fontSize,
      height: theme.typography.body2.fontSize,
    },
    blueCardRighWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    blueCardButtonWrapper: {
      display: 'flex',
    },
    blueCardButton: {
      '& .basic-button-class': {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        padding: '7px 10px',
        fontSize: '.7rem',
        marginLeft: 5,
        '&:hover': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
    createMeetingWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        '& .MuiButton-root': {
          width: '50%',
        },
      },
      [theme.breakpoints.up('lg')]: {
        maxHeight: 650,
      },
      '& .MuiButton-label': {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.secondary.main,
      },
      '& .MuiTypography-body1': {
        marginTop: '2vh',
      },
      '& .MuiButton-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    createMeetingIcons: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: '1vw',
      borderRadius: 20,
      width: '6vw',
      height: '6vw',
      [theme.breakpoints.down('xs')]: {
        width: '20vw',
        height: '20vw',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 80,
        maxHeight: 80,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      '& img': {
        width: '100%',
      },
    },
    rejoinButton: {
      padding: 0,
      '& .MuiButtonBase-root': {
        padding: 0,
        textAlign: 'start',
        '&:hover': {
          backgroundColor: 'unset',
        },
      },
      '& .MuiButton-label': {
        display: 'block',
      },
    },
  });
};

export default styles;
