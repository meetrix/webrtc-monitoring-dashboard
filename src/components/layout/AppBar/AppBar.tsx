import React, { memo, useState, useEffect } from 'react';
import {
  AppBar,
  Theme,
  Toolbar,
  MenuItem,
  SwipeableDrawer,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import {
  DateRange,
  VideocamOutlined,
  AccountCircle,
  ExitToApp,
  Menu,
  Help,
} from '@mui/icons-material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Dropdown } from '../../Dropdown';
import { getToken } from '../../../helper/localStorage';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      boxShadow: 'none',
      backgroundColor: theme.palette.common.white,
      '& .MuiToolbar-gutters': {
        paddingLeft: '2vw',
        paddingRight: '2vw',
      },
      '& .MuiMenuItem-root': {
        borderRadius: 4,
        padding: 0,
      },
      [theme.breakpoints.down('xs')]: {
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1000,
      },
      '& .MuiMenuItem-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'center',
    },
    itemsWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    largeView: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'end',
    },
    menuButtonWrapper: {
      flexGrow: 1,
      textAlign: 'right',
    },
    profileWrapper: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    profileTetxt: {
      '& .MuiTypography-root': {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    drawer: {
      minWidth: '50vw',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
    profileDropdown: {
      position: 'absolute !important' as 'absolute',
      right: '20px !important',
      transform: 'none !important',
      top: '52px !important',
    },
    userName: {
      textTransform: 'capitalize',
      marginLeft: 7,
    },
  });
};

export interface IAppBarProps extends WithStyles<typeof styles> {
  auth: {
    user: any;
  };
  signOut: () => void;
  getUserProfile: () => void;
}

const AppBarView = ({
  classes,
  auth,
  signOut,
  getUserProfile,
}: IAppBarProps) => {
  const navigate = useNavigate();
  const token = getToken();

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const { user } = auth;

  useEffect(() => {
    if (token) getUserProfile();
  }, []);

  const toggleProfile = (event: any) => {
    setProfileAnchorEl(event?.currentTarget);
  };

  const menuOptions = [
    {
      name: 'Overview',
      route: '/',
      onClick: () => navigate('/'),
    },
    {
      name: 'Meetings',
      route: '/meetings',
      onClick: () => navigate('/meetings'),
    },
    {
      name: 'Users',
      route: '/users',
      onClick: () => navigate('/users'),
    },
  ];
  const profileMenuList = [
    {
      label: 'Help & Support',
      id: 'help-support',
      onClick: () => console.log('Clicked'),
      icon: <Help fontSize="small" />,
    },
    {
      label: 'Sign Out',
      id: 'sign-out',
      onClick: () => signOut(),
      icon: <ExitToApp fontSize="small" />,
    },
  ];

  const reportingMenuList = [
    {
      label: 'Meeting Reports',
      id: 'meeting-reports',
      onClick: () => navigate('/reports/meetings'),
    },
  ];

  const filterFirstName = (fullName: string) => {
    const firstName = fullName?.split(' ')[0];
    return firstName;
  };

  return (
    <>
      <AppBar className={classes.root} position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <div className={clsx(classes.itemsWrapper, 'max-width-responsive')}>
            <div className={classes.title}>WebRTC Monitor Console</div>
            {!mobileView && (
              <div className={classes.largeView}>
                <MenuItem onClick={(e) => toggleProfile(e)} disableRipple>
                  {/* <AccountCircle className={classes.avatar} /> */}
                  <Avatar
                    alt={user?.profile?.name}
                    src={user?.profile?.picture}
                  />
                  <div className={classes.userName}>
                    {filterFirstName(user?.profile?.name)}
                  </div>
                </MenuItem>
              </div>
            )}
            {mobileView && (
              <div className={classes.menuButtonWrapper}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  edge="start"
                  // className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <Menu />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Dropdown
        id="app-bar-profile-more-option-button"
        open={Boolean(profileAnchorEl)}
        anchorRef={profileAnchorEl}
        handleClose={() => toggleProfile(null)}
        itemList={profileMenuList}
        customStyles={classes.profileDropdown}
        profileDropdown
      />
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <div className={classes.drawer}>
          <div>
            <MenuItem>
              <AccountCircle />
              {filterFirstName(user?.profile?.name)}
            </MenuItem>
            <Divider />
            {menuOptions.map((item) => (
              <MenuItem onClick={() => item.onClick()}>{item.name}</MenuItem>
            ))}
            {/* <Divider />
            {meetingMenuList.map((item) => (
              <MenuItem onClick={item.onClick} id={item.id}>
                {item.label}
              </MenuItem>
            ))}
            <Divider /> */}
            <MenuItem
              onClick={reportingMenuList[0].onClick}
              id={reportingMenuList[0].id}
            >
              {reportingMenuList[0].label}
            </MenuItem>
          </div>
          <div>
            {profileMenuList.map((item) => (
              <MenuItem onClick={item.onClick} id={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default memo(withStyles(styles)(AppBarView));
