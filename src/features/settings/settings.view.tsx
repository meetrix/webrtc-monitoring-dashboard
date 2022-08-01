/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Grid,
  Paper,
  ButtonProps,
  Divider,
  SelectChangeEvent,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  ClickAwayListener,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import clsx from 'clsx';
import styles from './settings.styles';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IPlugin } from './settings.slice';
import {
  SharedSecretComponent,
  StaticICEServerComponent,
  URLFetchComponent,
} from './iceServerConfigComponents';

export interface ISettingsView extends WithStyles<ButtonProps & typeof styles> {
  tokenList: IPlugin[] | null;
  actions: any;
  config: any;
  iceServerConfigType: string;
}

// Component for all the tokens
const TokenComponent = ({
  data,
  actions,
  classes,
  setServerSettingsPage,
  setDomainName,
}: {
  data: IPlugin;
  actions: any;
  classes: any;
  setServerSettingsPage: Function;
  setDomainName: Function;
}) => {
  const { domain, _id /* ,createdAt */ } = data;
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
    setServerSettingsPage();
    setDomainName(domain);
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
  iceServerConfigType,
  config,
}: ISettingsView) => {
  const [website, setWebsite] = React.useState('');
  const [isServerSettingsPage, setIsServerSettingsPage] = useState<boolean>(
    false
  );
  const [domain, setDomain] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [configTypes, setConfigTypes] = useState<string>('url');

  const guideLink = (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href="https://meetrix.io/blog/products/webrtc-monitor/setting-up-webrtc-troubleshooter.html"
      className={classes.link}
      target="_blank"
    >
      this guide
    </a>
  );
  const handleChange = (event: SelectChangeEvent) => {
    setConfigTypes(event.target.value as string);
    staticConfigData(event.target.value as string);
  };

  const handleConfigureButton = ({
    isConfigSettingsPage,
    selectedToken,
  }: {
    isConfigSettingsPage: boolean;
    selectedToken: string;
  }) => {
    setToken(selectedToken);
    setIsServerSettingsPage(isConfigSettingsPage);
  };
  const handleDomain = (value: string) => {
    setDomain(value);
  };
  const [settingsPage, setSettingsPage] = useState({
    title: 'Turn Server',
    info: (
      <>
        A GET API endpoint that returns an array of RTCIceServer objects. Follow
        &nbsp;{guideLink}&nbsp; this guide to setup your endpoint.
      </>
    ),
  });

  const staticConfigData = (value: string) => {
    switch (value) {
      case 'url':
        setSettingsPage({
          title: 'Turn Server',
          info: (
            <>
              A GET API endpoint that returns an array of RTCIceServer objects.
              Follow &nbsp;{guideLink}&nbsp; to setup your endpoint.
            </>
          ),
        });
        break;
      case 'static':
        setSettingsPage({
          title: 'ICE Servers',
          info: (
            <>
              JSON array of RTCIceServer objects. Follow &nbsp;{guideLink}&nbsp;
              to setup your endpoint.
            </>
          ),
        });
        break;
      case 'shared-secret':
        setSettingsPage({
          title: 'ICE Servers',
          info: (
            <>
              TURN URI &amp; shared secret. Follow &nbsp;{guideLink}&nbsp; to
              setup your endpoint.
            </>
          ),
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (token && isServerSettingsPage) actions.getICEServerConfig(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isServerSettingsPage]);

  useEffect(() => {
    if (!isServerSettingsPage) actions.clearICEServerConfig();
  }, [isServerSettingsPage]);

  useEffect(() => {
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line no-unused-expressions
      config ? setConfigTypes(iceServerConfigType) : setConfigTypes('url');
    }
  }, [config, token]);
  return (
    <div className={classes.root}>
      {isServerSettingsPage ? (
        <>
          <div className={classes.titleText} style={{ display: 'flex' }}>
            <div
              onClick={() => setIsServerSettingsPage(false)}
              style={{ cursor: 'pointer' }}
            >
              Settings{' '}
            </div>
            <div>&gt; {domain}</div>
          </div>
          <Paper elevation={0} className={classes.topPaper}>
            <div className={classes.token}>{settingsPage.title}</div>
            <Divider className={classes.divider} />
            <Grid container spacing={2} className={classes.inputWrapper}>
              <Grid item sm={5} lg={5}>
                <div className={classes.paperTextDark}>Configuration Mode</div>
              </Grid>
              <Grid item sm={7} lg={7}>
                <Box>
                  <Select
                    key={configTypes}
                    value={configTypes}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{
                      'aria-label': 'Without label',
                    }}
                    className={clsx(
                      classes.paperTextDark,
                      classes.configTypesDropdown
                    )}
                    variant="outlined"
                  >
                    <MenuItem
                      value="url"
                      className={classes.paperTextDark}
                      key="url-fetch"
                    >
                      URL Fetch
                    </MenuItem>
                    <MenuItem
                      value="static"
                      className={classes.paperTextDark}
                      key="static-ICE-servers"
                    >
                      Static ICE Servers
                    </MenuItem>
                    <MenuItem
                      value="shared-secret"
                      className={classes.paperTextDark}
                      key="shared-secret"
                    >
                      Shared Secret
                    </MenuItem>
                  </Select>
                </Box>
                <div className={classes.info}>
                  <InfoIcon className={classes.infoIcon} />
                  <div
                    className={classes.paperTextLight}
                    style={{ width: '24rem' }}
                  >
                    {settingsPage.info}
                  </div>
                </div>
              </Grid>
            </Grid>
            <URLFetchComponent
              classes={classes}
              actions={actions}
              token={token}
              type={configTypes}
            />
            <StaticICEServerComponent
              classes={classes}
              actions={actions}
              token={token}
              type={configTypes}
            />
            <SharedSecretComponent
              classes={classes}
              actions={actions}
              token={token}
              type={configTypes}
            />
          </Paper>
        </>
      ) : (
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
                      setServerSettingsPage={() =>
                        handleConfigureButton({
                          isConfigSettingsPage: true,
                          selectedToken: data._id,
                        })
                      }
                      setDomainName={handleDomain}
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
      )}
    </div>
  );
};

export default withStyles(styles)(Settings);
