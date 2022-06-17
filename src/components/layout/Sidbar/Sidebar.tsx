import React, { memo, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import FormatLineSpacingRoundedIcon from '@mui/icons-material/FormatLineSpacingRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import clsx from 'clsx';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      backgroundColor: theme.palette.common.white,
      margin: '3vh 2vw 0vh',
      '@media only screen and (min-width: 1920px)': {
        marginTop: '2.5vh',
      },
    },
    listWrapper: {
      color: '#5F5F5F',
      '& .MuiListItemText-root, .MuiTypography-root': {
        fontSize: theme.typography.body2.fontSize,
        margin: 0,
      },
      '& .MuiListItemIcon-root': {
        minWidth: 40,
      },
    },
    listForMainItems: {
      '& .Mui-selected': {
        background: '#F9FBFF',
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.main,
        },
      },
      '& .Mui-selected:hover': {
        backgroundColor: '#F9FBFF !important',
      },
      '& .MuiListItem-root:hover': {
        backgroundColor: 'transparent',
      },
    },
    listForSubItems: {
      '& .Mui-selected': {
        background: '#F5F5F5',
        color: '#5F5F5F',
      },
      '& .Mui-selected:hover': {
        backgroundColor: '#F5F5F5 !important',
      },
      '& .MuiListItem-root:hover': {
        backgroundColor: '#F5F5F5',
      },
    },
    listItem: {
      borderRadius: '5px',
    },
    subListItem: {
      backgroundColor: '#F5F5F5',
    },
  });
};

export type ISidebarProps = WithStyles<typeof styles>;

const Sidebar = ({ classes }: ISidebarProps) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Home');

  const SidebarItems = [
    {
      label: 'Home',
      path: '/dashboard/incoming-connections',
      icon: <HomeRoundedIcon />,
      subItem: false,
    },
    {
      label: 'Troubleshooter',
      path: '/dashboard/incoming-connections',
      icon: '',
      subItem: true,
    },
    {
      label: 'Overview',
      path: '/dashboard/incoming-connections',
      icon: <EqualizerRoundedIcon />,
      subItem: false,
    },
    {
      label: 'Detailed View',
      path: '/dashboard/incoming-connections',
      icon: <FormatLineSpacingRoundedIcon />,
      subItem: false,
    },
    {
      label: 'Debugger',
      path: '/dashboard/incoming-connections',
      icon: '',
      subItem: true,
    },
    {
      label: 'Incoming Connections',
      path: '/dashboard/incoming-connections',
      icon: <CallRoundedIcon />,
      subItem: false,
    },
    {
      label: 'Call Stat Monitoring',
      path: '/dashboard/call-stat-monitoring',
      icon: <FormatListBulletedRoundedIcon />,
      subItem: false,
    },
    {
      label: 'Settings',
      path: '/dashboard/incoming-connections',
      icon: <ConstructionRoundedIcon />,
      subItem: false,
    },
  ];

  const handleOnClick = (data: any) => {
    setSelectedItem(data.label);
    navigate(data.path);
  };

  return (
    <div className={classes.root}>
      {SidebarItems.map((data, index) => (
        <List
          className={clsx(
            data.subItem ? classes.listForSubItems : classes.listForMainItems,
            classes.listWrapper
          )}
        >
          <ListItem
            button
            key={index}
            className={clsx(
              data.subItem && classes.subListItem,
              classes.listItem
            )}
            onClick={() => handleOnClick(data)}
            selected={selectedItem === data.label}
            disableRipple
          >
            <ListItemIcon>{data.icon}</ListItemIcon>
            <ListItemText primary={data.label} />
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default memo(withStyles(styles)(Sidebar));
