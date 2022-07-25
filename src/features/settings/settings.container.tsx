/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect } from 'react';
import Settings from './settings.view';
import { getUrlParams } from '../../utils/urlUtils';
import { mockIncomingConnection } from '../../mocks/report';
import {
  clearConfigs,
  iceServerConfigGetAsync,
  iceServerConfigSetAsync,
  pluginCreateAsync,
  pluginGetAllAsync,
  pluginRegenerateAsync,
  pluginRevokeAsync,
  selectConfig,
  selectPlugins,
} from './settings.slice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export interface ISettingsAsyncContainer {}

const SettingsAsyncContainer: React.FC<ISettingsAsyncContainer> = ({}: ISettingsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();

  const plugins = useAppSelector(selectPlugins);
  const dispatch = useAppDispatch();
  const iceServerConfig = useAppSelector(selectConfig);
  const { config, iceServerConfigType } = iceServerConfig;
  useEffect(() => {
    if (!mockStats) {
      dispatch<any>(pluginGetAllAsync());
    }
  }, [dispatch, mockStats]);

  const IncomingConnectionMock = mockStats ? mockIncomingConnection : plugins;

  const tokens = [...IncomingConnectionMock];

  const sortedTokenList =
    tokens?.length !== 0
      ? tokens?.sort((a, b) => {
          const keyA = a.createdAt || '';
          const keyB = b.createdAt || '';
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        })
      : [];

  return (
    <Settings
      actions={{
        createToken: (data: any) => {
          dispatch<any>(pluginCreateAsync(data));
        },
        revokeToken: (_id: string) => {
          dispatch<any>(pluginRevokeAsync(_id));
        },
        regenerateToken: (_id: string) => {
          dispatch<any>(pluginRegenerateAsync(_id));
        },
        setICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigSetAsync(data));
        },
        getICEServerConfig: (data: any) => {
          dispatch<any>(iceServerConfigGetAsync(data));
        },
        clearICEServerConfig: () => {
          dispatch<any>(clearConfigs());
        },
      }}
      tokenList={sortedTokenList}
      config={config}
      iceServerConfigType={iceServerConfigType}
    />
  );
};

export default SettingsAsyncContainer;
