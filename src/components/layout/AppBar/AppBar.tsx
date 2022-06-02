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
  Settings,
  Menu,
  Help,
  ExpandMore,
} from '@mui/icons-material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { Dropdown } from '../../Dropdown';
import { Logo } from '../../../assets/icons';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid',
      borderBottomColor: '#00000029',
      '& .MuiToolbar-gutters': {
        paddingLeft: '3vw',
        paddingRight: '3vw',
      },
      '& .MuiMenuItem-root': {
        borderRadius: 4,
      },
      [theme.breakpoints.down('xs')]: {
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1000,
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
    },
    menuButtonWrapper: {
      flexGrow: 1,
      textAlign: 'right',
    },
    leftWrapper: {
      display: 'flex',
      flexGrow: 1,
    },
    logo: {
      height: 35,
      marginRight: '3vw',
    },
    avatar: {
      marginRight: 8,
    },
    dropdownIcon: {
      marginLeft: 5,
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
  });
};

export interface IAppBarProps extends WithStyles<typeof styles> {
  auth: {
    user: any;
  };
  signOut: () => void;
}

const AppBarView = ({ classes, auth, signOut }: IAppBarProps) => {
  const navigate = useNavigate();

  const [mtnAnchorEl, setMtnAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [reportingAnchorEl, setReportingAnchorEl] = useState(null);
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

  const toggleMeetingMenu = (event: any) => {
    setMtnAnchorEl(event?.currentTarget);
  };

  const toggleProfile = (event: any) => {
    setProfileAnchorEl(event?.currentTarget);
  };

  const toggleReporting = (event: any) => {
    setReportingAnchorEl(event?.currentTarget);
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
      label: 'Settings',
      onClick: () => navigate('/settings'),
      icon: <Settings fontSize="small" />,
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
            <img
              className={classes.logo}
              src={Logo}
              alt="meeting-manager-logo"
            />
            {!mobileView && (
              <div className={classes.largeView}>
                <div className={classes.leftWrapper}>
                  {menuOptions.map((item) => (
                    <MenuItem onClick={() => item.onClick()} id={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={(e) => toggleReporting(e)}>
                    Reporting
                    <ExpandMore
                      fontSize="small"
                      color="inherit"
                      className={classes.dropdownIcon}
                    />
                  </MenuItem>
                </div>
                <MenuItem onClick={(e) => toggleMeetingMenu(e)}>
                  Host A Meeting
                  <ExpandMore
                    fontSize="small"
                    color="inherit"
                    className={classes.dropdownIcon}
                  />
                </MenuItem>
                <MenuItem onClick={(e) => toggleProfile(e)}>
                  {/* <AccountCircle className={classes.avatar} /> */}
                  <Avatar
                    className={classes.avatar}
                    alt={user?.profile?.name}
                    src={user?.profile?.picture}
                  />
                  {filterFirstName(user?.profile?.name)}
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
      {/* <Dropdown
        id="app-bar-meeting-more-option-button"
        open={Boolean(mtnAnchorEl)}
        anchorRef={mtnAnchorEl}
        handleClose={() => toggleMeetingMenu(null)}
        itemList={meetingMenuList}
      />
      <Dropdown
        id="app-bar-profile-more-option-button"
        open={Boolean(profileAnchorEl)}
        anchorRef={profileAnchorEl}
        handleClose={() => toggleProfile(null)}
        itemList={profileMenuList}
      />
      <Dropdown
        id="app-bar-reporting-button"
        open={Boolean(reportingAnchorEl)}
        anchorRef={reportingAnchorEl}
        handleClose={() => toggleReporting(null)}
        itemList={reportingMenuList}
      /> */}
      {/* <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={false}
      >
        <MenuItem onClick={(e) => toggleProfile(e)}>
          <AccountCircle className={classes.avatar} />
          {user?.profile?.name}
        </MenuItem>
        {menuOptions.map((item) => (
          <MenuItem onClick={() => item.onClick()}>{item.name}</MenuItem>
        ))}
      </Drawer> */}
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <div className={classes.drawer}>
          <div>
            <MenuItem>
              <AccountCircle className={classes.avatar} />
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
