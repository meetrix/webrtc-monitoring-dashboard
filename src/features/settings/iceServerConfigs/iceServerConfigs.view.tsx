/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

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
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import clsx from 'clsx';
import styles from '../settings.styles';
import {
  SharedSecretComponent,
  StaticICEServerComponent,
  URLFetchComponent,
} from './iceServerConfigComponents';

export interface ISettingsView extends WithStyles<ButtonProps & typeof styles> {
  actions: any;
  config: any;
  iceServerConfigType: string;
  selectedDomain: string;
  token: string;
  isServerSettingsPage: boolean;
}

const ICEServerConfigs: React.FC<ISettingsView> = ({
  classes,
  actions,
  iceServerConfigType,
  config,
  selectedDomain,
  token,
  isServerSettingsPage,
}: ISettingsView) => {
  const [configTypes, setConfigTypes] = useState<string>('url');
  const navigate = useNavigate();
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
  const handleSettingsPage = () => {
    actions.setIsServerSettingsPage(false);
    navigate('/dashboard/settings');
  };

  useEffect(() => {
    if (token) actions.getICEServerConfig(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!isServerSettingsPage) {
      navigate('/dashboard/settings');
    }
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
      <>
        <div className={classes.titleText} style={{ display: 'flex' }}>
          <div onClick={handleSettingsPage} style={{ cursor: 'pointer' }}>
            Settings{' '}
          </div>
          <div>&gt; {selectedDomain}</div>
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
    </div>
  );
};

export default withStyles(styles)(ICEServerConfigs);
