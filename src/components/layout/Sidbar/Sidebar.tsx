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
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from 'react-router-dom';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      backgroundColor: theme.palette.common.white,
    },
    list: {
      color: '#757575',
      marginRight: 15,
      '& .Mui-selected': {
        background: '#E4F0FE',
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.main,
        },
      },
      '& .MuiListItemText-root, .MuiTypography-root': {
        fontSize: '0.8rem',
        margin: 0,
      },
      '& .MuiListItemIcon-root': {
        minWidth: 40,
      },
    },
    listItem: {
      borderRadius: '0 5000px 5000px 0',
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
    },
    {
      label: 'Incoming Connections',
      path: '/dashboard/incoming-connections',
    },
    {
      label: 'Call Stat Monitoring',
      path: '/dashboard/call-stat-monitoring',
    },
  ];

  const handleOnClick = (data: any) => {
    setSelectedItem(data.label);
    navigate(data.path);
  };

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {SidebarItems.map((data, index) => (
          <ListItem
            button
            key={index}
            className={classes.listItem}
            onClick={() => handleOnClick(data)}
            selected={selectedItem === data.label}
          >
            <ListItemIcon>
              <CircleIcon />
            </ListItemIcon>
            <ListItemText primary={data.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default memo(withStyles(styles)(Sidebar));
