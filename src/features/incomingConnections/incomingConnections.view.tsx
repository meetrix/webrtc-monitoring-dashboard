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
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import clsx from 'clsx';
import styles from './incomingConnections.styles';
import { PasswordTextField, TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { IPlugin } from './incomingConnections.slice';

export interface IIncomingConnectionsView
  extends WithStyles<ButtonProps & typeof styles> {
  tokenList: IPlugin[] | null;
  actions: any;
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
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleRevoke = () => {
  //   handleClose();
  //   actions.revokeToken(_id);
  // };
  // const handleRegenerate = () => {
  //   handleClose();
  //   actions.regenerateToken(_id);
  // };

  const handleConfigureButton = () => {
    setServerSettingsPage(true);
    setDomainName(domain);
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
      {/* <Typography variant="body2" className={classes.grayText}>
        {createdAt.substring(0, 10)}
      </Typography>
      <Button
        id="token-more-button"
        label="More"
        customStyles={classes.moreButton}
        onClick={handleClick}
      /> */}
      <Button
        id="token-more-button"
        label="Configure"
        customStyles={classes.configureButton}
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
    </div>
  );
};

// Component for URL ICE server config mode
const URLFetchComponent = ({
  classes,
  actions,
  token,
}: {
  classes: any;
  actions: any;
  token: string;
}) => {
  const [url, setURL] = useState('');

  return (
    <Grid container spacing={2} className={classes.inputWrapper}>
      <Grid item sm={5} lg={5}>
        <div className={classes.paperTextDark}>URL</div>
      </Grid>
      <Grid item sm={7} lg={7}>
        <TextField
          value={url}
          onChange={(e) => setURL(e.target.value)}
          customStyles={clsx(classes.textField, classes.textFieldWidth)}
        />
        <Button
          id="url-save-settings"
          label="Save settings"
          variant="contained"
          fullWidth
          customStyles={classes.settingsSaveButton}
          onClick={() => {
            if (url && url.length > 0) {
              actions.setICEServerConfig({
                id: token,
                data: {
                  mode: 'url',
                  url,
                },
              });
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

// Component for static ICE server config mode
const StaticICEServerComponent = ({
  classes,
  actions,
  token,
}: {
  classes: any;
  actions: any;
  token: string;
}) => {
  const [staticInput, setStaticInput] = useState('');
  const [jsonValue, setjsonValue] = useState(null);

  useEffect(() => {
    if (staticInput && staticInput.length > 0) {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setjsonValue(JSON.parse(staticInput));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Input value is not a valid JSON string');
      }
    }
  }, [staticInput]);

  return (
    <Grid container spacing={2} className={classes.inputWrapper}>
      <Grid item sm={5} lg={5}>
        <div className={classes.paperTextDark}>Username</div>
      </Grid>
      <Grid item sm={7} lg={7}>
        <TextField
          value={staticInput}
          onChange={(e) => setStaticInput(e.target.value)}
          customStyles={clsx(classes.textField, classes.textFieldWidth)}
          multipleLine
          rows={6}
        />
        <Button
          id="static-save-settings"
          label="Save settings"
          variant="contained"
          fullWidth
          customStyles={classes.settingsSaveButton}
          onClick={() => {
            if (jsonValue && jsonValue !== null) {
              actions.setICEServerConfig({
                id: token,
                data: {
                  mode: 'static',
                  iceServers: jsonValue,
                },
              });
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

// Component for shared secret ICE server config mode
const SharedSecretComponent = ({
  classes,
  actions,
  token,
}: {
  classes: any;
  actions: any;
  token: string;
}) => {
  const [uri, setURI] = useState('');
  const [secret, setSecret] = useState('');

  return (
    <>
      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item sm={5} lg={5}>
          <div className={classes.paperTextDark}>TURN URI</div>
        </Grid>
        <Grid item sm={7} lg={7}>
          <TextField
            id="shared-secret-uri"
            value={uri}
            onChange={(e) => setURI(e.target.value)}
            customStyles={clsx(classes.textField, classes.textFieldWidth)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={5} lg={5}>
          <div className={classes.paperTextDark}>Shared Secret</div>
        </Grid>
        <Grid item sm={7} lg={7}>
          <PasswordTextField
            id="shared-secret"
            onChange={(e) => setSecret(e.target.value)}
            customStyles={clsx(classes.textField, classes.passwordTextField)}
          />
          <Button
            id="shared-secret-save-settings"
            label="Save settings"
            variant="contained"
            fullWidth
            customStyles={classes.settingsSaveButton}
            onClick={() => {
              if (uri && uri.length > 0 && secret && secret.length) {
                actions.setICEServerConfig({
                  id: token,
                  data: {
                    mode: 'shared-secret',
                    uri,
                    secret,
                  },
                });
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

const IncomingConnections: React.FC<IIncomingConnectionsView> = ({
  classes,
  tokenList,
  actions,
}: IIncomingConnectionsView) => {
  const [website, setWebsite] = React.useState('');
  const [isServerSettingsPage, setIsServerSettingsPage] = useState<boolean>(
    false
  );
  const [domain, setDomain] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [configTypes, setConfigTypes] = useState<string>('url-fetch');
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
  const [settingsPage, setSettingsPage] = useState({
    title: 'Turn Server',
    info: (
      <>
        A GET API endpoint that returns an array of RTCIceServer objects. Follow
        &nbsp;{guideLink}&nbsp; this guide to setup your endpoint.
      </>
    ),
    component: (
      <URLFetchComponent classes={classes} actions={actions} token={token} />
    ),
  });

  const staticConfigData = (value: string) => {
    switch (value) {
      case 'url-fetch':
        setSettingsPage({
          title: 'Turn Server',
          info: (
            <>
              A GET API endpoint that returns an array of RTCIceServer objects.
              Follow &nbsp;{guideLink}&nbsp; to setup your endpoint.
            </>
          ),
          component: (
            <URLFetchComponent
              classes={classes}
              actions={actions}
              token={token}
            />
          ),
        });
        break;
      case 'static-ICE-servers':
        setSettingsPage({
          title: 'ICE Servers',
          info: <>JSON array of RTCIceServer objects.</>,
          component: (
            <StaticICEServerComponent
              classes={classes}
              actions={actions}
              token={token}
            />
          ),
        });
        break;
      case 'shared-secret':
        setSettingsPage({
          title: 'ICE Servers',
          info: <>TURN URI &amp; shared secret.</>,
          component: (
            <SharedSecretComponent
              classes={classes}
              actions={actions}
              token={token}
            />
          ),
        });
        break;
      default:
        break;
    }
  };
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
    setIsServerSettingsPage(isConfigSettingsPage);
    setToken(selectedToken);
  };
  const handleDomain = (value: string) => {
    setDomain(value);
  };

  return (
    <div className={classes.root}>
      {isServerSettingsPage ? (
        <>
          <div className={classes.titleText}>Settings &gt; {domain}</div>
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
                      value="url-fetch"
                      className={classes.paperTextDark}
                    >
                      URL Fetch
                    </MenuItem>
                    <MenuItem
                      value="static-ICE-servers"
                      className={classes.paperTextDark}
                    >
                      Static ICE Servers
                    </MenuItem>
                    <MenuItem
                      value="shared-secret"
                      className={classes.paperTextDark}
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
            {settingsPage.component}
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

export default withStyles(styles)(IncomingConnections);
