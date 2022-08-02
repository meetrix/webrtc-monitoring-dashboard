/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';
import {
  Grid,
  Paper,
  ButtonProps,
  Divider,
  IconButton,
  Tooltip,
  ClickAwayListener,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from './settings.styles';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IPlugin } from './settings.slice';

export interface ISettingsView extends WithStyles<ButtonProps & typeof styles> {
  tokenList: IPlugin[] | null;
  actions: any;
  isServerSettingsPage: boolean;
}

// Component for all the tokens
const TokenComponent = ({
  data,
  actions,
  classes,
}: {
  data: IPlugin;
  actions: any;
  classes: any;
}) => {
  const { domain, _id /* ,createdAt */ } = data;
  const navigate = useNavigate();
  const [tokenCopyButtonClicked, setTokenCopyButtonClicked] = useState(false);
  const [urlCopyButtonClicked, setURLCopyButtonClicked] = useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleRevoke = () => {
    actions.revokeToken(_id);
  };
  // const handleRegenerate = () => {
  //   handleClose();
  //   actions.regenerateToken(_id);
  // };

  const handleConfigureButton = () => {
    actions.setSelectedToken(_id);
    actions.setSelectedDomainName(domain);
    actions.setIsServerSettingsPage(true);
    navigate('/dashboard/settings/configs');
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setURLCopyButtonClicked(false);
      setTokenCopyButtonClicked(false);
    }, 5000); // 5 seconds

    return () => {
      clearTimeout(timeId);
    };
  }, [urlCopyButtonClicked, tokenCopyButtonClicked]);

  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

  return (
    <div className={classes.tokenRoot}>
      <Grid container spacing={2}>
        <Grid item sm={4} lg={4}>
          <div className={classes.tokenTitleWrapper}>
            <div className={classes.paperTextDark}>{domain}</div>
            <div style={{ display: 'flex' }}>
              <div className={classes.paperTextLight}>{_id}</div>
              <ClickAwayListener
                onClickAway={() => setTokenCopyButtonClicked(false)}
              >
                <div style={{ display: 'flex' }}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setTokenCopyButtonClicked(false)}
                    open={tokenCopyButtonClicked}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copied!"
                    classes={{
                      tooltip: classes.tooltip,
                    }}
                    placement="bottom"
                  >
                    <IconButton
                      className={classes.copyIcon}
                      onClick={() => {
                        navigator.clipboard.writeText(_id);
                        setTokenCopyButtonClicked(true);
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </Grid>
        <Grid
          item
          sm={3}
          lg={4}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <Link
              to={`/troubleshooter?token=${_id}`}
              className={classes.link}
              target="_blank"
            >
              Troubleshooter URL
            </Link>
            <ClickAwayListener
              onClickAway={() => setURLCopyButtonClicked(false)}
            >
              <div style={{ display: 'flex' }}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setURLCopyButtonClicked(false)}
                  open={urlCopyButtonClicked}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Copied!"
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  placement="bottom"
                >
                  <IconButton
                    className={classes.copyIcon}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${publicUrl.origin}/troubleshooter?token=${_id}`
                      );
                      setURLCopyButtonClicked(true);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </div>
        </Grid>
        <Grid
          item
          sm={5}
          lg={4}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {/* <Typography variant="body2" className={classes.grayText}>
            {createdAt.substring(0, 10)}
            </Typography> */}
          <Button
            id="token-delete-button"
            label="Delete"
            customStyles={classes.tokenItemButton}
            onClick={handleRevoke}
          />
          <Button
            id="token-configure-button"
            label="Configure"
            customStyles={classes.tokenItemButton}
            onClick={handleConfigureButton}
          />
          {/* <Menu
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
            </Menu> */}
        </Grid>
      </Grid>
    </div>
  );
};

const Settings: React.FC<ISettingsView> = ({
  classes,
  tokenList,
  actions,
  isServerSettingsPage,
}: ISettingsView) => {
  const [website, setWebsite] = React.useState('');

  useEffect(() => {
    if (!isServerSettingsPage) actions.clearICEServerConfig();
  }, [isServerSettingsPage]);

  return (
    <div className={classes.root}>
      <>
        <div className={classes.titleText}>Settings</div>
        <Paper elevation={0} className={classes.topPaper}>
          <div className={classes.token}>Tokens</div>
          <Divider className={classes.divider} />
          <Grid container spacing={2} className={classes.inputWrapper}>
            <Grid item sm={12} lg={5}>
              <div className={classes.paperTextDark}>
                Enter your domain name
              </div>
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
      </>
    </div>
  );
};

export default withStyles(styles)(Settings);
