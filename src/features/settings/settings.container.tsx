/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect } from 'react';
import Settings from './settings.view';
import { getUrlParams } from '../../utils/urlUtils';
import { mockIncomingConnection } from '../../mocks/report';
import {
  setSettingsPage,
  clearConfigs,
  pluginCreateAsync,
  pluginGetAllAsync,
  pluginRegenerateAsync,
  pluginRevokeAsync,
  selectPlugins,
  setDomainName,
  setToken,
  selectConfig,
} from './settings.slice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export interface ISettingsAsyncContainer {}

const SettingsAsyncContainer: React.FC<ISettingsAsyncContainer> = ({}: ISettingsAsyncContainer) => {
  const { clientId, domain, mockStats } = getUrlParams();

  const plugins = useAppSelector(selectPlugins);
  const dispatch = useAppDispatch();
  const iceServerConfig = useAppSelector(selectConfig);
  const { isServerSettingsPage } = iceServerConfig;
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
        clearICEServerConfig: () => {
          dispatch<any>(clearConfigs());
        },
        setSelectedDomainName: (data: any) => {
          dispatch<any>(setDomainName(data));
        },
        setSelectedToken: (data: any) => {
          dispatch<any>(setToken(data));
        },
        setIsServerSettingsPage: (data: any) => {
          dispatch<any>(setSettingsPage(data));
        },
      }}
      tokenList={sortedTokenList}
      isServerSettingsPage={isServerSettingsPage}
    />
  );
};

export default SettingsAsyncContainer;
