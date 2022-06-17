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
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
        <div className={classes.paperTextDark}>{domain}</div>
        <div style={{ display: 'flex' }}>
          <div className={classes.paperTextLight}>{_id}</div>
          <ContentCopyIcon
            className={classes.copyIcon}
            onClick={() => {
              navigator.clipboard.writeText(_id);
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Link to={`/troubleshooter?token=${_id}`} className={classes.link}>
          Troubleshooter URL
        </Link>
        <ContentCopyIcon
          className={classes.copyIcon}
          onClick={() => {
            navigator.clipboard.writeText(
              `http://localhost:3000/troubleshooter?token=${_id}`
            );
          }}
        />
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
        id="token-more-button"
        label="Configure"
        customStyles={classes.moreButton}
        // onClick={handleClick}
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
      <div className={classes.titleText}>Settings</div>
      <Paper elevation={0} className={classes.topPaper}>
        <div className={classes.token}>Tokens</div>
        <Divider className={classes.divider} />
        <Grid container spacing={2} className={classes.inputWrapper}>
          <Grid item sm={12} lg={5}>
            <div className={classes.paperTextDark}>Enter your domain name</div>
          </Grid>
          <Grid item sm={12} lg={4}>
            <TextField
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              customStyles={classes.textField}
            />
            <div className={classes.info}>
              <InfoIcon className={classes.infoIcon} />
              <div className={classes.paperTextLight}>
                Enter the domain name where you want to load the plugin.
              </div>
            </div>
          </Grid>
          <Grid item sm={12} lg={3}>
            <Button
              id="generate-token"
              label="Generate your token"
              variant="contained"
              fullWidth
              customStyles={classes.tokenGenerateButton}
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
        <div className={classes.paperTextDark}>Tokens</div>
        <Divider className={classes.divider} />
        <div className={classes.tokenList}>
          {tokenList?.length !== 0 ? (
            tokenList?.map((data) => (
              <>
                <TokenComponent
                  key={data._id}
                  data={data}
                  actions={actions}
                  classes={classes}
                />
                <Divider className={classes.divider} />
              </>
            ))
          ) : (
            <Box
              sx={{ p: '3%', textAlign: 'center' }}
              className={classes.paperTextLight}
            >
              No tokens available
            </Box>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(IncomingConnections);
