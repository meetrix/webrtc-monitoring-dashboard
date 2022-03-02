import React, { memo } from 'react';
import {
  Theme,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles } from '@mui/styles';
import { Typography } from '../Typography';

const styles = (theme: Theme) => {
  return createStyles({
    popper: {
      zIndex: 1000,
    },
    root: {
      '& .MuiListItemIcon-root': {
        minWidth: 35,
      },
    },
  });
};

export interface IMenuItemProps {
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
  icon?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  label:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

export interface IDropdownProps extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  id: string;
  customStyles?: any;
  open: boolean;
  anchorRef: any;
  handleClose: (event: MouseEvent | TouchEvent) => void;
  itemList: any;
}

const Dropdown = ({
  classes,
  id,
  children,
  customStyles,
  open,
  anchorRef,
  handleClose,
  itemList,
}: IDropdownProps) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef}
      role={undefined}
      transition
      disablePortal
      className={classes.popper}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper className={clsx(classes.root, customStyles && customStyles)}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id={id}
                // onKeyDown={handleListKeyDown}
              >
                {children}
                {children && <Divider />}
                {itemList.map((data: IMenuItemProps) => {
                  return (
                    <MenuItem onClick={data.onClick}>
                      {data.icon && <ListItemIcon>{data.icon}</ListItemIcon>}
                      <Typography variant="body2">{data.label}</Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default memo(withStyles(styles)(Dropdown));
