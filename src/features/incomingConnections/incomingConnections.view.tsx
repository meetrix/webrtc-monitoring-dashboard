/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
  ButtonProps,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import styles from './incomingConnections.styles';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IPlugin } from './incomingConnections.slice';

export interface IIncomingConnectionsView
  extends WithStyles<ButtonProps & typeof styles> {
  tokenList: IPlugin[] | null;
  actions: any;
}

const TokenComponent = ({
  data,
  actions,
  classes,
}: {
  data: IPlugin;
  actions: any;
  classes: any;
}) => {
  const { domain, _id, createdAt } = data;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRevoke = () => {
    handleClose();
    actions.revokeToken(_id);
  };
  const handleRegenerate = () => {
    handleClose();
    actions.regenerateToken(_id);
  };
  return (
    <div className={classes.tokenRoot}>
      <div className={classes.tokenTitleWrapper}>
        <Typography variant="body2" fontWeight={600}>
          {domain}
        </Typography>
        <Typography variant="body2" className={classes.grayText}>
          {_id}
        </Typography>
      </div>
      <Typography variant="body2" className={classes.grayText}>
        {createdAt.substring(0, 10)}
      </Typography>
      <Button
        id="token-more-button"
        label="More"
        customStyles={classes.moreButton}
        onClick={handleClick}
      />
      <Button
        id="token-copy"
        label="Copy to clipboard"
        onClick={() => {
          navigator.clipboard.writeText(_id);
        }}
      />
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleRevoke}>Revoke</MenuItem>
        <MenuItem onClick={handleRegenerate}>Regenerate</MenuItem>
      </Menu>
    </div>
  );
};

const IncomingConnections: React.FC<IIncomingConnectionsView> = ({
  classes,
  tokenList,
  actions,
}: IIncomingConnectionsView) => {
  const [website, setWebsite] = React.useState('');

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topPaper}>
        <Typography variant="h5">Generate your token</Typography>
        <Grid container spacing={2} className={classes.inputWrapper}>
          <Grid item sm={12} lg={9}>
            <TextField
              label="Enter your website link here"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Grid>
          <Grid item sm={12} lg={3}>
            <Button
              id="generate-token"
              label="Generate your token"
              variant="contained"
              fullWidth
              onClick={() => {
                if (
                  website &&
                  website.length > 0 &&
                  /^\w+(:?\.\w+)*/.test(website)
                ) {
                  actions.createToken({ domain: website });
                }
              }}
            />
          </Grid>
        </Grid>
        <Link to="/" className={classes.link}>
          Learn more
        </Link>
      </Paper>
      <Typography variant="body2" color="GrayText">
        TOKENS
      </Typography>
      <Paper elevation={0} className={classes.bottomPaper}>
        {tokenList?.map((data) => (
          <TokenComponent
            key={data._id}
            data={data}
            actions={actions}
            classes={classes}
          />
        )) || (
          <Box sx={{ p: '5%', textAlign: 'center' }}>No tokens available</Box>
        )}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(IncomingConnections);
