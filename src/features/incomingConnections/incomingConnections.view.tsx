/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Grid,
  // Menu,
  Paper,
  // Typography,
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
  setServerSettingsPage,
  setDomainName,
}: {
  data: IPlugin;
  actions: any;
  classes: any;
  setServerSettingsPage: Function;
  setDomainName: Function;
  // isServerSettingsPage: boolean;
}) => {
  const { domain, _id /* ,createdAt */ } = data;
  // const [isServerSettingsPage, setIsServerSettingsPage] = useState<boolean>(
  //   false
  // );
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

const URLFetchComponent = ({ classes }: { classes: any }) => {
  const [url, setURL] = React.useState('');
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
      </Grid>
    </Grid>
  );
};

const StaticICEServerComponent = ({ classes }: { classes: any }) => {
  const [JSONArray, setJSONArray] = React.useState('');
  return (
    <Grid container spacing={2} className={classes.inputWrapper}>
      <Grid item sm={5} lg={5}>
        <div className={classes.paperTextDark}>Username</div>
      </Grid>
      <Grid item sm={7} lg={7}>
        <TextField
          value={JSONArray}
          onChange={(e) => setJSONArray(e.target.value)}
          customStyles={clsx(classes.textField, classes.textFieldWidth)}
          multipleLine
          rows={6}
        />
      </Grid>
    </Grid>
  );
};

const SharedSecretComponent = ({ classes }: { classes: any }) => {
  const [url, setURL] = React.useState('');
  return (
    <>
      <Grid container spacing={2} className={classes.inputWrapper}>
        <Grid item sm={5} lg={5}>
          <div className={classes.paperTextDark}>TURN URI</div>
        </Grid>
        <Grid item sm={7} lg={7}>
          <TextField
            value={url}
            onChange={(e) => setURL(e.target.value)}
            customStyles={clsx(classes.textField, classes.textFieldWidth)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={5} lg={5}>
          <div className={classes.paperTextDark}>Shared Secret</div>
        </Grid>
        <Grid item sm={7} lg={7}>
          <TextField
            value={url}
            onChange={(e) => setURL(e.target.value)}
            customStyles={clsx(classes.textField, classes.textFieldWidth)}
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
  const [configTypes, setConfigTypes] = useState<string>('url-fetch');
  const [settingsPage, setSettingsPage] = useState({
    title: 'Turn Server',
    info:
      'A GET API endpoint that returns an array of RTCIceServer objects. Follow this guide to setup your endpoint.  ',
    component: <URLFetchComponent classes={classes} />,
  });

  const renderTabContent = (value: string) => {
    switch (value) {
      case 'url-fetch':
        setSettingsPage({
          title: 'Turn Server',
          info:
            'A GET API endpoint that returns an array of RTCIceServer objects. Follow this guide to setup your endpoint.  ',
          component: <URLFetchComponent classes={classes} />,
        });
        break;
      case 'static-ICE-servers':
        setSettingsPage({
          title: 'ICE Servers',
          info: 'JSON array of RTCIceServer objects',
          component: <StaticICEServerComponent classes={classes} />,
        });
        break;
      case 'shared-secret':
        setSettingsPage({
          title: 'ICE Servers',
          info: 'TURN URI & shared secret',
          component: <SharedSecretComponent classes={classes} />,
        });
        break;
      default:
        break;
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setConfigTypes(event.target.value as string);
    renderTabContent(event.target.value as string);
  };
  const handleConfigureButton = (value: boolean) => {
    setIsServerSettingsPage(value);
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
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={clsx(
                      classes.paperTextDark,
                      classes.configTypesDropdown
                    )}
                    variant="outlined"
                  >
                    <MenuItem
                      value="url-fetch"
                      // className={classes.paperTextDark}
                    >
                      URL Fetch
                    </MenuItem>
                    <MenuItem
                      value="static-ICE-servers"
                      // className={classes.paperTextDark}
                    >
                      Static ICE Servers
                    </MenuItem>
                    <MenuItem
                      value="shared-secret"
                      // className={classes.paperTextDark}
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
                      setServerSettingsPage={handleConfigureButton}
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
